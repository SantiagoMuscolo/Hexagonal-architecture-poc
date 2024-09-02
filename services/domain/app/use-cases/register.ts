import { ForControlAuthenticating, ForRepoQuerying } from "../../ports/drivens";
import { AuthDetails, AuthenticatedUser, User } from "../schemas";

export class Register implements ForControlAuthenticating {
  constructor(
    private readonly controlAuthenticator: ForControlAuthenticating,
    private readonly repoQuerier: ForRepoQuerying
  ) {}

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
