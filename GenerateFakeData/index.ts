import { GenerateUserData } from "./GenerateUserData";
import { UserT } from "./Types/User";
import readline from "readline";

async function run() {
	// 4. Connect to MongoDB

	for (let i = 0; true; i++) {
		try {
			const User: UserT = await GenerateUserData();

			const resp = await fetch("http://localhost:3001/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(User),
			});
			if(resp.status === 401) {
				await askQuestion("Some Error Happened at: " + i);
			}
			const usr = await resp.json();
			console.log(usr?.email + ": " + i);
		} catch (error) {
			console.log(error)
			await askQuestion("Some Error Happened at: " + i);
		}
	}
}

function askQuestion(query: string) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) =>
		rl.question(query, (ans) => {
			rl.close();
			resolve(ans);
		})
	);
}

run()
