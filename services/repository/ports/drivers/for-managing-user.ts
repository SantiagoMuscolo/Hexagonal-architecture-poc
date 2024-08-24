import { User } from "../../app/schemas/user";

export interface ForManagingUser {
    getUser(email:string): Promise<User>;
    createUser(user: User, password: string): Promise<User>;
}