import { z } from "zod";

export const pageSlugParamSchema = z.object({
  slug: z.string().min(1),
});

export const sectionIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createPageSchema = z.object({
  slug: z.string().trim().min(1).max(60),
  title: z.string().trim().min(1).max(120),
});

export const createSectionSchema = z.object({
  type: z.string().trim().min(1).max(60),
  order: z.number().int().min(0).optional(),
  visible: z.boolean().default(true),
  data: z.record(z.any()).default({}),
});

export const updateSectionSchema = z.object({
  visible: z.boolean().optional(),
  data: z.record(z.any()).optional(),
});

// Body: [{ id: 3, order: 0 }, { id: 1, order: 1 }, ...]
export const reorderSectionsSchema = z.object({
  order: z
    .array(z.object({ id: z.number().int().positive(), order: z.number().int().min(0) }))
    .min(1),
});
