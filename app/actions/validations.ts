import * as z from "zod"

export const ActionInput = z.object({
  userId: z.number().min(0),
  activityId: z.number().min(0),
  comment: z.string().optional(),
})

export type ActionInputType = z.infer<typeof ActionInput>
