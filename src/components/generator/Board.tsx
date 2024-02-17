"use client";

import { Suspense, useEffect } from "react";
import ToolBar from "@/components/generator/ToolBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Table from "@/components/generator/Table";
import { Skeleton } from "@mui/material";

const queryClient = new QueryClient();

export default function Board() {
    return (
        <div className="mt-5">
            <Suspense fallback={<Skeleton />}>
                <QueryClientProvider client={queryClient}>
                    <Table />
                </QueryClientProvider>
            </Suspense>
        </div>
    );
}
