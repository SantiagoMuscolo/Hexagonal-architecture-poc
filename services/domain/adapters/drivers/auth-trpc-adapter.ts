
import { initTRPC } from "@trpc/server";
import { AuthenticatedUserSchema, RegisterSchema } from "../../app/schemas";
import { Login, Register } from "../../app/use-cases";

export function authTRPCAdapter(
  login: Login,
  register: Register,
  t: ReturnType<typeof initTRPC.create>
) {
  return t.router({
    login: t.procedure
      .input(RegisterSchema.pick({ email: true, password: true }))
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) =>  login.login(input.email, input.password)),

    register: t.procedure
      .input(RegisterSchema)
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => register.register(input, input.password)),
  });
}
