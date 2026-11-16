import { z } from "zod"

// Validate external data once; infer TypeScript types from the same contracts.
export const conversionResultSchema = z.object({
  markdown: z.string(),
  filename: z.string().min(1),
  source: z.string().optional(),
  size: z.number().int().nonnegative().optional(),
})

export const conversionCountSchema = z.object({
  total_conversions: z.number().int().nonnegative(),
})

export const apiErrorSchema = z.object({
  detail: z.union([
    z.string().min(1),
    z.array(z.object({ msg: z.string().min(1) })).min(1),
  ]),
})

export const historyItemSchema = conversionResultSchema.pick({
  markdown: true,
  filename: true,
}).extend({
  id: z.string().min(1),
  words: z.number().int().nonnegative(),
  time: z.number().int().nonnegative(),
})

export type ConversionResult = z.infer<typeof conversionResultSchema>
export type ConversionCount = z.infer<typeof conversionCountSchema>
export type HistoryItem = z.infer<typeof historyItemSchema>
