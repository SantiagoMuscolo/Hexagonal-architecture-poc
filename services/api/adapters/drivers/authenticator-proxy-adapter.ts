import { ForAuthenthicating } from "../../ports/drivers/for-authenticating";
import { Api } from "../../app/api";
import { AuthenticatedUser, User } from "../../app/schemas";


export class AuthenticatorProxyAdapter implements ForAuthenthicating {
    constructor(private readonly Api: Api) {}

    login(email: string, password: string): Promise<AuthenticatedUser>{
        return this.Api.login(email, password);
    }
    register(user: User, password: string): Promise<AuthenticatedUser>{
        return this.Api.register(user, password);
    }
}