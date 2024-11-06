import { z } from 'zod';

export const validator = z.object({
  email: z.string().email(),
  passkey: z.string()
}).required()

export type UserLoginDTO = z.infer<typeof validator>
