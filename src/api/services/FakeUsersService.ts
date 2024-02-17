import { TParamsGetFakeUsers } from "@/types/types";
import { IFakeUser } from "@/types/IFakeUser";
import { api } from "@/api/axios.config";

export default class FakeUsersService {
    static async getFakeUsers({ seed, limit, locale }: TParamsGetFakeUsers) {
        return api.get<IFakeUser[]>("/api", {
            params: {
                seed,
                limit,
                locale,
            },
        });
    }
}
