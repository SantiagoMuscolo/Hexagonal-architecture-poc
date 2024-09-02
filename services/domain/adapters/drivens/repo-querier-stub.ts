import { ForRepoQuerying } from "../../ports/drivens/for-repo-querying";
import { User as RepoUser } from "../../../repository/app/schemas/user";
import { User } from "../../app/schemas";

const usersMock: RepoUser[] = [];

export class RepoQueryStub implements ForRepoQuerying {
    getUser(email: string): Promise<RepoUser> {
        const normalizedEmail = email.toLowerCase();
        const user = usersMock.find(u => u.email.toLowerCase() === normalizedEmail);

        if (user) {
            return Promise.resolve(user);
        } else {
            throw new Error("user not found")
        }
    }

    createUser(_user: User, _password: string): Promise<RepoUser> {

        const newUser: RepoUser = {
            id: Math.random().toString().slice(2),
            name: _user.name,
            email: _user.email,
            password: _password
        };
        usersMock.push(newUser); 
        return Promise.resolve(newUser);
    }
}