"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import FakeUsersService from "@/api/services/FakeUsersService";
import useFakeUsersActions from "@/hooks/useFakeUsersActions";
import SelectCountry from "@/components/inputs/SelectCountry";

export default function TableView() {
    const { getFakeUsers, loading } = useFakeUsersActions();

    useEffect(() => {}, []);

    return (
        <div>
            <div>
                <div>
                    <SelectCountry />
                </div>
            </div>
            <div></div>
        </div>
    );
}
