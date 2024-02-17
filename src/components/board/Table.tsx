"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import FakeUsersService from "@/api/services/FakeUsersService";
import useFakeUsersActions from "@/hooks/useFakeUsersActions";
import SelectCountry from "@/components/inputs/SelectCountry";
import RangeInputErrors from "@/components/inputs/RangeInputErrors";

export default function TableView() {
    const { getFakeUsers, loading } = useFakeUsersActions();

    useEffect(() => {}, []);

    return (
        <div>
            <div>
                <div className="flex gap-14 items-center">
                    <SelectCountry />
                    <RangeInputErrors />
                </div>
            </div>
            <div></div>
        </div>
    );
}
