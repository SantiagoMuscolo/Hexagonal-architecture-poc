import { Repository } from "../../app/repository";
import { User } from "../../app/schemas/user";
import { ForManagingUser } from "../../ports/drivers";

export class UserManagerProxy implements ForManagingUser {
    constructor (private readonly repository: Repository) {}

    async getUser(email: string): Promise<User> {
        return this.repository.getUser(email)
    }

    async createUser(user: User, password: string): Promise<User> {
        return this.repository.createUser(user, password);
    }
}