"use client";

import { Suspense, useEffect } from "react";
import ToolBar from "@/components/generator/ToolBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TestTable from "@/components/generator/TestTable";

const queryClient = new QueryClient();

export default function Board() {
    return (
        <div className="mt-5">
            <Suspense>
                <QueryClientProvider client={queryClient}>
                    <TestTable />
                </QueryClientProvider>
            </Suspense>
        </div>
    );
}
