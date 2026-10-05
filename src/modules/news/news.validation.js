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
  title: z.string().trim().min(1, "Заголовок обязателен").max(300),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().max(1000).optional().nullable(),
  body: z.string().trim().min(1, "Текст новости обязателен"),
  category: z.string().trim().min(1).default("Новость"),
  date: z.coerce.date().default(() => new Date()),
  externalUrl: z.string().optional().nullable().or(z.literal("")),
  coverImage: z.string().optional().nullable(),
  published: z.boolean().default(true),
});

export const updateNewsSchema = createNewsSchema.partial();

