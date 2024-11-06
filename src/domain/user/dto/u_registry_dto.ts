import { z } from 'zod';

export const validator = z.object({
  username: z.string(),
  email: z.string().email(),
  passkey: z.string().min(12, 'Insuficient length'),
  shoppingMaxAmount: z.number().min(1)
})

export type UserRegistryDTO = z.infer<typeof validator>
