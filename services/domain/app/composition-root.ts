import { initTRPC } from "@trpc/server";
import { ControlAuthenticatorStub } from "../adapters/drivens/control-authenticator-stub";
import { RepoQueryStub } from "../adapters/drivens/repo-querier-stub";
import { AuthenticatorProxyAdapter, authTRPCAdapter } from "../adapters/drivers";
import { Login, Register } from "./use-cases";

// const compositionMock = () => {
//     //drivens
//     const controlAuthenticatorStub = new ControlAuthenticatorStub();
//     const repoQuerierStub = new RepoQueryStub();

//     //app
//     const apiMock = new Api(controlAuthenticatorStub, repoQuerierStub);

//     //drivers
//     const authenthicatorProxyAdapter = new AuthenticatorProxyAdapter(apiMock);

//     return { authenthicatorProxyAdapter };
// }

// export const { authenthicatorProxyAdapter } = compositionMock();


export const localTRPCCompose = () => {
    const t = initTRPC.create();

    // Instancias de casos de uso
    const controlAuthenticatorStub = new ControlAuthenticatorStub();
    const repoQuerierStub = new RepoQueryStub();

    const loginUseCase = new Login(controlAuthenticatorStub, repoQuerierStub);
    const registerUseCase = new Register(controlAuthenticatorStub, repoQuerierStub);

    const authRouter = authTRPCAdapter(loginUseCase, registerUseCase, t);

    const appRouter = t.mergeRouters(authRouter);

    return { appRouter };
}
