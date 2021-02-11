import * as z from "zod"

export const ActivityInput = z.object({
  points: z.number().min(0).max(9999),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
})
export type ActivityInputType = z.infer<typeof ActivityInput>
