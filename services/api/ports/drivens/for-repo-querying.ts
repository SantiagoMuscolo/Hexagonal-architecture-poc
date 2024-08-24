import { User } from "../../../repository/app/schemas/user";


export interface ForRepoQuerying {
    getUser(email: string): Promise<User>;
    createUser(user: User, password: string): Promise<User>;
}