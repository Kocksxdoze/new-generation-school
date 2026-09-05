import { z } from "zod";

export const listNewsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(12),
  category: z.string().trim().optional(),
  published: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  search: z.string().trim().optional(),
});

export const newsIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const newsSlugParamSchema = z.object({
  slug: z.string().min(1),
});

export const createNewsSchema = z.object({
  title: z.string().trim().min(3).max(200),
  excerpt: z.string().trim().max(300).optional(),
  body: z.string().trim().min(1),
  category: z.string().trim().min(1),
  date: z.coerce.date(),
  externalUrl: z.string().url().optional().or(z.literal("")),
  coverImage: z.string().optional(),
  published: z.boolean().default(true),
});

export const updateNewsSchema = createNewsSchema.partial();
