import { ForControlAuthenticating, ForRepoQuerying } from "../ports/drivens";
import { AuthDetails, AuthenticatedUser, User } from "./schemas";

export class Api implements ForControlAuthenticating {
  constructor(
    private readonly controlAuthenticator: ForControlAuthenticating,
    private readonly repoQuerier: ForRepoQuerying
  ) {}

  async login(email: string, password: string): Promise<AuthenticatedUser> {
    console.log('LOGIN', )
    const AuthDetails = await this.controlAuthenticator.getAuthDetails(
      email,
      password
    );
    const permissions = await this.controlAuthenticator.getPermissions(
      email,
      password
    );

    const user = await this.repoQuerier.getUser(email);

    const result = {
      ...user,
      ...AuthDetails,
      permissions: {
        admin: permissions.admin,
        user: permissions.user,
      },
    };

    return result;
  }

  async register(user: User, password: string): Promise<AuthenticatedUser> {
    const newUser = await this.repoQuerier.createUser(user, password);

    const authDetails = await this.controlAuthenticator.getAuthDetails(
      user.email,
      password
    );

    const permissions = await this.controlAuthenticator.getPermissions(
      user.email,
      password
    );

    const result = {
      ...newUser,
      ...authDetails,
      permissions: {
        admin: permissions.admin,
        user: permissions.user,
      },
    };

    console.log("REGISTER", result);
    return result;
  }

  async getAuthDetails(email: string, password: string): Promise<AuthDetails> {
    return this.controlAuthenticator.getAuthDetails(email, password);
  }

  async getPermissions(
    email: string,
    password: string
  ): Promise<{ admin: boolean; user: boolean }> {
    return this.controlAuthenticator.getPermissions(email, password);
  }
}
