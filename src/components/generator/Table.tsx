import { type UIEvent, useCallback, useEffect, useMemo, useRef } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowVirtualizer,
} from "material-react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TParamsGetFakeUsers } from "@/types/types";
import FakeUsersService from "@/api/services/FakeUsersService";
import { IFakeUser } from "@/types/IFakeUser";
import { useSearchParams } from "next/navigation";
import ToolBar from "@/components/generator/ToolBar";
import { ExportToCsv } from "ts-export-to-csv";

const COLUMNS: MRT_ColumnDef<IFakeUser>[] = [
    {
        accessorKey: "uuid",
        header: "UUID",
    },
    {
        accessorKey: "full_name",
        header: "Full Name",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "phone",
        header: "Phone Number",
    },
];

const CSV_CONFIG = {
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: "fakeUsers",
};

const csvExporter = new ExportToCsv(CSV_CONFIG);

export default function Table() {
    const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method
    const params = useSearchParams();
    const urlParams: TParamsGetFakeUsers = {
        seed: Number(params.get("seed")),
        locale: params.get("locale") as string,
        errors: Number(params.get("errors")),
    };

    const { data, fetchNextPage, isError, isFetching, isLoading } =
        useInfiniteQuery<IFakeUser[]>({
            queryKey: ["table-data", urlParams],
            queryFn: async ({ pageParam }) => {
                const res = await FakeUsersService.getFakeUsers({
                    ...urlParams,
                    seed: Number(`${params.get("seed")}${pageParam}`),
                    limit: pageParam === 0 ? 20 : 10,
                });
                return res.data as IFakeUser[];
            },
            initialPageParam: 0,
            getNextPageParam: (_lastGroup, groups) => groups.length,
            refetchOnWindowFocus: false,
        });

    const flatData = useMemo(
        () => data?.pages.flatMap((page) => page) ?? [],
        [data],
    );

    const totalFetched = flatData.length;

    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } =
                    containerRefElement;
                if (
                    scrollHeight - scrollTop - clientHeight < 5 &&
                    !isFetching
                ) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched],
    );

    useEffect(() => {
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    const handleExportData = () => {
        const newIdData = flatData.map((user, index) => {
            return {
                ...user,
                id: index + 1,
            };
        });
        csvExporter.generateCsv(newIdData);
    };

    const table = useMaterialReactTable({
        columns: COLUMNS,
        data: flatData,
        enableRowNumbers: true,
        enableGlobalFilter: false,
        enableFilters: false,
        enablePagination: false,
        enableHiding: false,
        enableSorting: false,
        enableFullScreenToggle: false,
        enableDensityToggle: false,
        enableStickyHeader: true,
        muiTableContainerProps: {
            ref: tableContainerRef,
            sx: { maxHeight: "500px" },
            onScroll: (event: UIEvent<HTMLDivElement>) =>
                fetchMoreOnBottomReached(event.target as HTMLDivElement),
        },
        muiToolbarAlertBannerProps: isError
            ? {
                  color: "error",
                  children: "Error loading data",
              }
            : undefined,
        state: {
            density: "comfortable",
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isFetching,
        },
        rowVirtualizerInstanceRef,
        rowVirtualizerOptions: { overscan: 4 },
        renderTopToolbarCustomActions: ({ table }) => (
            <ToolBar handleSave={handleExportData} />
        ),
    });

    return <MaterialReactTable table={table} />;
}
