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

const sectionDataSchema = z.preprocess((val) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return {};
    }
  }
  return val || {};
}, z.record(z.any()));

export const createSectionSchema = z.object({
  type: z.string().trim().min(1).max(60),
  order: z.number().int().min(0).optional(),
  visible: z.boolean().default(true),
  data: sectionDataSchema.default({}),
});

export const updateSectionSchema = z.object({
  visible: z.boolean().optional(),
  data: sectionDataSchema.optional(),
});

// Body: [{ id: 3, order: 0 }, { id: 1, order: 1 }] OR [3, 1, 2]
export const reorderSectionsSchema = z.object({
  order: z.preprocess((val) => {
    if (Array.isArray(val)) {
      return val.map((item, idx) => {
        if (typeof item === "number" || typeof item === "string") {
          return { id: Number(item), order: idx };
        }
        if (typeof item === "object" && item !== null && "id" in item) {
          return { id: Number(item.id), order: item.order !== undefined ? Number(item.order) : idx };
        }
        return item;
      });
    }
    return val;
  }, z.array(z.object({ id: z.number().int().positive(), order: z.number().int().min(0) })).min(1)),
});
