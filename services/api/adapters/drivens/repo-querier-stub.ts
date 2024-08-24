import { ForRepoQuerying } from "../../ports/drivens/for-repo-querying";
import { User as RepoUser } from "../../../repository/app/schemas/user";
import { User } from "../../app/schemas";

const userMock: RepoUser = {
    id: '123123',
    name: 'fulano',
    email: 'fulano@gmail.com',
    password: 'password'
}

export class RepoQueryStub implements ForRepoQuerying {
    getUser(_email: string): Promise<RepoUser> {
        return Promise.resolve(userMock)
    }
    createUser(_user: User, _password: string): Promise<RepoUser> {
        return Promise.resolve(userMock)
    }
}