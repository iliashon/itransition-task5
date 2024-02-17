import {
    faker,
    Faker,
    fakerDE,
    fakerEN,
    fakerFR,
    fakerPL,
    fakerRU,
    fakerZH_CN,
} from "@faker-js/faker";
import { IFakeUser } from "@/types/IFakeUser";

const LOCALE_FAKERS: Map<string, Faker> = new Map([
    ["en", fakerEN],
    ["ru", fakerRU],
    ["de", fakerDE],
    ["fr", fakerFR],
    ["pl", fakerPL],
    ["zh_CN", fakerZH_CN],
]);

function getEnFakeUsers(limit: number, faker: Faker): IFakeUser[] {
    return [...new Array(limit)].map((_, index) => {
        return {
            id: index,
            uuid: faker.string.uuid(),
            full_name: faker.person.fullName(),
            address: `${faker.location.city()}, ${faker.location.streetAddress()}`,
            phone: faker.phone.number(),
        };
    });
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const seed: number = Number(searchParams.get("seed"));
    const limit: number = Number(searchParams.get("limit")) || 20;
    const errors: number = Number(searchParams.get("errors")) || 0;
    const locale: string = searchParams.get("locale") || "en";
    const newFaker: Faker = LOCALE_FAKERS.get(locale) as Faker;

    newFaker.seed(seed);

    const fakeUsers = getEnFakeUsers(limit, newFaker);

    return Response.json({ fakeData: fakeUsers });
}
