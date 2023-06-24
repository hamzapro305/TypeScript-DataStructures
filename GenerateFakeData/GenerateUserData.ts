import { faker } from "@faker-js/faker";
import { UserT } from "./Types/User";

export const GenerateUserData = (): Promise<UserT> => {
	return new Promise(async (res, rej) => {
		try {
			const sex = faker.person.sexType();
			const firstName = faker.person.firstName(sex);
			const lastName = faker.person.lastName(sex);
			const fullName = faker.person.fullName({ firstName, lastName, sex });
			const email = faker.internet.email({ firstName, lastName });
			const Data: UserT = {
				fullName: fullName,
				userName: faker.internet.userName({ firstName, lastName }),
				password: faker.internet.password({ memorable: true }),
				photoURL: faker.internet.avatar(),
				email: email,
				age: faker.number.int({ min: 5, max: 25 }),
				gender: sex.toUpperCase(),
				type: "STUDENT",
				roles: ["ROLE_STUDENT"],
			};
			res(Data);
		} catch (error) {
			console.log(error);
			rej(false);
		}
	});
};
