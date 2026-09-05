import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(1, "Введите логин или email"),
  password: z.string().min(1, "Введите пароль"),
});

export const createUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8, "Минимум 8 символов"),
  role: z.enum(["ADMIN", "EDITOR"]).default("EDITOR"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "Минимум 8 символов"),
});
