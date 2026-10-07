import { z } from "zod";

export const createApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Имя слишком короткое").max(100),
  phone: z.string().trim().min(7, "Укажите корректный номер телефона").max(30),
  email: z.preprocess((val) => {
    if (!val || typeof val !== "string" || val.trim() === "") return "";
    return val.trim();
  }, z.string().email("Некорректный email").or(z.literal("")).optional().nullable()),
  childGrade: z.preprocess((val) => {
    if (val === null || val === undefined) return "";
    return String(val).trim();
  }, z.string().max(100).optional().nullable()),
  type: z.preprocess((val) => {
    if (!val || typeof val !== "string") return "admission";
    const lower = val.trim().toLowerCase();
    return ["admission", "consultation", "tour", "question"].includes(lower) ? lower : "admission";
  }, z.enum(["admission", "consultation", "tour", "question"]).default("admission")),
  message: z.preprocess((val) => {
    if (val === null || val === undefined) return "";
    return String(val).trim();
  }, z.string().max(1000).optional().nullable()),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "RESOLVED", "ARCHIVED"]),
  notes: z.string().trim().max(1000).optional(),
});

export const listApplicationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["NEW", "CONTACTED", "RESOLVED", "ARCHIVED"]).optional(),
  search: z.string().trim().optional(),
});

export const applicationIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
