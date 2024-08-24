import { Api } from "../../app/api";
import { initTRPC } from "@trpc/server";
import { AuthenticatedUserSchema, RegisterSchema } from "../../app/schemas";

export function authTRPCAdapter(
  api: Api,
  t: ReturnType<typeof initTRPC.create>
) {
  return t.router({
    login: t.procedure
      .input(RegisterSchema.pick({ email: true, password: true }))
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) =>  api.login(input.email, input.password)),

    register: t.procedure
      .input(RegisterSchema)
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => api.register(input, input.password)),
  });
}
