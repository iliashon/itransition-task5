import Board from "@/components/generator/Board";
import { Suspense } from "react";

export default function Generator() {
    return (
        <main className="mt-24 mx-8">
            <h1 className="text-3xl mb-6">Fake Users</h1>
            <Board />
        </main>
    );
}
