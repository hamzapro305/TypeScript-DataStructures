type UserType = "STUDENT" | "TEACHER" | "ADMIN";

type role = `ROLE_${UserType}`;

interface UserT {
	userName: string;
	fullName: string;
	password: string;
	photoURL: string;
	email: string;
	age: number;
	gender: string;
	type: UserType;
	roles: role[];
}

export type { UserT };
