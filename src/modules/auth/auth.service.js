import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db.js";
import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";

const SALT_ROUNDS = 12;

function toPublicUser(user) {
  const { password, ...publicUser } = user;
  return publicUser;
}

function signToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn },
  );
}

export async function login({ login, password }) {
  const user = await prisma.user.findFirst({
    where: { OR: [{ username: login }, { email: login }] },
  });

  if (!user) {
    throw ApiError.unauthorized("Неверный логин или пароль");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw ApiError.unauthorized("Неверный логин или пароль");
  }

  const token = signToken(user);
  return { token, user: toPublicUser(user) };
}

export async function createUser({ username, email, password, role }) {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (existing) {
    throw ApiError.conflict("Пользователь с таким логином или email уже существует");
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { username, email, password: hashed, role },
  });

  return toPublicUser(user);
}

export async function changePassword(userId, { currentPassword, newPassword }) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw ApiError.notFound("Пользователь не найден");
  }

  const passwordMatches = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatches) {
    throw ApiError.badRequest("Текущий пароль указан неверно");
  }

  const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
}

export async function getUserById(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw ApiError.notFound("Пользователь не найден");
  }
  return toPublicUser(user);
}

export { signToken };
