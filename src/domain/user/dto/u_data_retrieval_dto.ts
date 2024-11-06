import { z } from 'zod';

export const validator = z.object({
  user_id: z.string()
}).required()

export type UserRetrievalDTO = z.infer<typeof validator>
