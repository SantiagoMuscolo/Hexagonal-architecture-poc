import { initTRPC } from "@trpc/server";
import { ControlAuthenticatorStub } from "../adapters/drivens/control-authenticator-stub";
import { RepoQueryStub } from "../adapters/drivens/repo-querier-stub";
import { AuthenticatorProxyAdapter, authTRPCAdapter } from "../adapters/drivers";
import { Api } from "./api"

const compositionMock = () => {
    //drivens
    const controlAuthenticatorStub = new ControlAuthenticatorStub();
    const repoQuerierStub = new RepoQueryStub();

    //app
    const apiMock = new Api(controlAuthenticatorStub, repoQuerierStub);

    //drivers
    const authenthicatorProxyAdapter = new AuthenticatorProxyAdapter(apiMock);

    return { authenthicatorProxyAdapter };
}

export const { authenthicatorProxyAdapter } = compositionMock();

// const registerMock = {
//     name: 'hola',
//     email: "hola@gmail.com"
// }

// authenthicatorProxyAdapter.register(registerMock, '1234')
// authenthicatorProxyAdapter.login('hola@gmail.com', '1234');

export const localTRPCCompose = () => {
    //drivens
    const controlAuthenticatorStub = new ControlAuthenticatorStub();
    const repoQuerierStub = new RepoQueryStub();

    //app
    const apiMock = new Api(controlAuthenticatorStub, repoQuerierStub);

   //TRPC Instance
   const t = initTRPC.create();

   //TRPC Driver
   const authTRPCAdapterRouter = authTRPCAdapter(apiMock, t);

   const appRouter = t.mergeRouters(authTRPCAdapterRouter);

   return { appRouter };
}
