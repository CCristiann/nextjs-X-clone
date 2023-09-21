import { z } from 'zod'

export const TweetValidator = z.object({
    body: z.string(),
    image: z.string().nullable(),
    creator: z.string()
})

export type TweetCreationRequest = z.infer<typeof TweetValidator>