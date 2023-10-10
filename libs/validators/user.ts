import { z } from "zod";

export const UserValidator = z.object({
  email: z.string(),
  username: z.string(),
  name: z.string(),
  password: z.string(),
});

export type UserCreationRequest = z.infer<typeof UserValidator>;
