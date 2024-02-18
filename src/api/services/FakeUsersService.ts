import { TParamsGetFakeUsers } from "@/types/types";
import { IFakeUser } from "@/types/IFakeUser";
import { api } from "@/api/axios.config";
import { AxiosResponse } from "axios";

export default class FakeUsersService {
    static async getFakeUsers({
        seed,
        limit,
        locale,
        errors,
    }: TParamsGetFakeUsers): Promise<AxiosResponse<IFakeUser[]>> {
        return api.get<IFakeUser[]>("/api", {
            params: {
                seed: seed || "",
                limit: limit || "",
                locale: locale || "",
                errors: errors || "",
            },
        });
    }
}
