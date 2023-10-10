import { z } from "zod";

export const UploadValidator = z.object({
  path: z.string().nullish(),
});

export type UploadRequest = z.infer<typeof UploadValidator>;
