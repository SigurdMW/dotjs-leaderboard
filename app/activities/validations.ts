import * as z from "zod"

export const ActivityInput = z.object({
  points: z
    .string()
    .refine((p) => !isNaN(parseInt(p, 10)), "Value must be a number")
    .refine((p) => parseInt(p, 10) >= 0, "Value must be greater than 0")
    .refine((p) => parseInt(p, 10) <= 9999, "Value must be less than 9999"),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
})
export type ActivityInputType = z.infer<typeof ActivityInput>
