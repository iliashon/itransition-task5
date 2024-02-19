import {
    faker,
    Faker,
    fakerDE,
    fakerEN,
    fakerFR,
    fakerPL,
    fakerRU,
} from "@faker-js/faker";
import { IFakeUser } from "@/types/IFakeUser";
import ErrorsFakeUsers from "@/api/middlewares/ErrorsFakeUsers";

const LOCALE_FAKERS: Map<string, Faker> = new Map([
    ["en", fakerEN],
    ["ru", fakerRU],
    ["de", fakerDE],
    ["fr", fakerFR],
    ["pl", fakerPL],
]);

function getFakeUsers(
    faker: Faker,
    limit: number,
    errors: number,
): IFakeUser[] {
    const errorFaker = new ErrorsFakeUsers(faker, errors);
    const arrFakeUsers = [...new Array(limit)].map((_, index) => {
        return {
            id: index,
            uuid: faker.string.uuid(),
            full_name: faker.person.fullName(),
            address: `${faker.location.zipCode()}, ${faker.helpers.maybe(() => `${faker.location.state()}, `, { probability: 0.5 }) || ""}${faker.location.city()}, ${faker.location.streetAddress(faker.helpers.maybe(() => true, { probability: 0.5 }))}`,
            phone: faker.phone.number(),
        };
    });
    return errorFaker.generateErrors(arrFakeUsers);
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const seed: number =
        Number(searchParams.get("seed")) || faker.number.int({ max: 1000000 });
    const limit: number = Number(searchParams.get("limit")) || 20;
    const errors: number = Number(searchParams.get("errors")) || 0;
    const locale: string = searchParams.get("locale") || "en";
    const localeFaker: Faker = LOCALE_FAKERS.get(locale) as Faker;

    localeFaker.seed(seed);

    const fakeUsers = getFakeUsers(localeFaker, limit, errors);

    return Response.json(fakeUsers);
}
