import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email('Invalid email'),
    password: z.string().optional(),
})

export type User = z.infer<typeof UserSchema>;