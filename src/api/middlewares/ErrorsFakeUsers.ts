import { Faker } from "@faker-js/faker";
import { IFakeUser } from "@/types/IFakeUser";

const LOCALE_ALFABET: Map<string, string> = new Map([
    ["en", "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890"],
    [
        "ru",
        "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя1234567890",
    ],
    [
        "de",
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzÄäÖöÜüß1234567890",
    ],
    [
        "fr",
        "ÂâABCDEFGHIJKLMNOPQRSTUVWXYZÀàÇçÉéÊêÈèËëÏïÎîÔôÛûÙùÜüŸÿabcdefghijklmnopqrstuvwxyz1234567890",
    ],
    [
        "pl",
        "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻaąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż1234567890",
    ],
]);

export default class ErrorsFakeUsers {
    private FAKER: Faker;
    private ERRORS: number;
    private arrErrors: number[] = [];
    constructor(faker: Faker, errors: number) {
        this.FAKER = faker;
        const probability = (errors - Math.floor(errors)) * 100;
        this.ERRORS =
            Math.floor(errors) +
            (probability < faker.number.int({ max: 99 }) ? 0 : 1);
    }

    errorsDistribution() {
        let countError = this.ERRORS;
        this.arrErrors = [...new Array(3)].map((el, index) => {
            if (index === 2) {
                return countError;
            } else {
                const randomNumber = this.FAKER.number.int({ max: countError });
                countError -= randomNumber;
                return randomNumber;
            }
        });
    }

    createIndexErrors(user: IFakeUser): IFakeUser {
        const arrUserValue: string[] = Object.values(user).slice(2);
        this.arrErrors.forEach((errNum, index) => {
            for (let i = 0; i < errNum; i++) {
                switch (this.FAKER.number.int({ max: 2 })) {
                    case 0:
                        arrUserValue[index] = this.deleteSymbol(
                            arrUserValue[index],
                            this.FAKER.number.int({
                                max: arrUserValue[index].length,
                            }),
                        );
                        break;
                    case 1:
                        arrUserValue[index] = this.addSymbol(
                            arrUserValue[index],
                            this.FAKER.number.int({
                                max: arrUserValue[index].length,
                            }),
                            this.FAKER.string.fromCharacters(
                                LOCALE_ALFABET.get(
                                    this.FAKER.getMetadata().code as string,
                                ) as string,
                            ),
                        );
                        break;
                    case 2:
                        arrUserValue[index] = this.replaceSymbol(
                            arrUserValue[index],
                            this.FAKER.number.int({
                                max: arrUserValue[index].length,
                            }),
                        );
                        break;
                }
            }
        });
        return {
            ...user,
            full_name: arrUserValue[0],
            address: arrUserValue[1],
            phone: arrUserValue[2],
        };
    }

    generateErrors(users: IFakeUser[]): IFakeUser[] {
        const arrErrorsUsers: IFakeUser[] = [];
        users.forEach((user) => {
            this.errorsDistribution();
            arrErrorsUsers.push(this.createIndexErrors(user));
        });
        return arrErrorsUsers;
    }
    deleteSymbol(str: string, index: number) {
        return str.slice(0, index) + str.slice(index + 1);
    }

    addSymbol(str: string, index: number, symbol: string) {
        return str.slice(0, index) + symbol + str.slice(index);
    }

    replaceSymbol(str: string, index: number) {
        const firstSymbol = str[index];
        str = this.deleteSymbol(str, index);
        str = this.addSymbol(str, index + 1, firstSymbol);
        return str;
    }
}
