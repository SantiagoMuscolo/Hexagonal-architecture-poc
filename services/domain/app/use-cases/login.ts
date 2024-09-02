import { ForControlAuthenticating, ForRepoQuerying } from "../../ports/drivens";
import { AuthDetails, AuthenticatedUser, User } from "../schemas";

export class Login implements ForControlAuthenticating {
  constructor(
    private readonly controlAuthenticator: ForControlAuthenticating,
    private readonly repoQuerier: ForRepoQuerying
  ) {}

  async login(email: string, password: string): Promise<AuthenticatedUser> {
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
