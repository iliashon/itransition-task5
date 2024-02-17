import TableView from "@/components/board/TableView";
import { Suspense } from "react";

export default function Board() {
    return (
        <main className="mt-28 mx-8">
            <h1 className="text-3xl mb-8">Board</h1>
            <Suspense>
                <TableView />
            </Suspense>
        </main>
    );
}
