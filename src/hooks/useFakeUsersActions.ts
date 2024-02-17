import { useState } from "react";
import FakeUsersService from "@/api/services/FakeUsersService";
import { TParamsGetFakeUsers } from "@/types/types";

function useFakeUsersActions() {
    const [loading, setLoading] = useState(false);

    function handleError() {}

    function getFakeUsers(data: TParamsGetFakeUsers) {
        setLoading(true);
        try {
            return FakeUsersService.getFakeUsers(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return { getFakeUsers, loading };
}

export default useFakeUsersActions;
