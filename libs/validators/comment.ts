import { z } from "zod";

export const CommentValidator = z.object({
  body: z.string(),
  image: z.string().nullable(),
  creator: z.string(),
  tweetId: z.string().nullish(),
});

export type CommentCreationRequest = z.infer<typeof CommentValidator>;
