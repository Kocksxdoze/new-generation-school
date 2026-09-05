import { env } from "../../config/env.js";
import { sendSuccess } from "../../utils/ApiResponse.js";
import * as authService from "./auth.service.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, keep in sync with JWT_EXPIRES_IN
};

export async function loginController(req, res) {
  const { token, user } = await authService.login(req.body);
  res.cookie(env.jwt.cookieName, token, COOKIE_OPTIONS);
  sendSuccess(res, { data: { user, token } });
}

export async function logoutController(req, res) {
  res.clearCookie(env.jwt.cookieName);
  sendSuccess(res, { data: null });
}

export async function meController(req, res) {
  const user = await authService.getUserById(req.user.sub);
  sendSuccess(res, { data: user });
}

// Only an existing ADMIN can create more admin/editor accounts.
export async function createUserController(req, res) {
  const user = await authService.createUser(req.body);
  sendSuccess(res, { statusCode: 201, data: user });
}

export async function changePasswordController(req, res) {
  await authService.changePassword(req.user.sub, req.body);
  sendSuccess(res, { data: null });
}
