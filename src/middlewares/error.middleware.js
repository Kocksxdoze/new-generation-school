import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.js";

// Thanks to `express-async-errors`, any thrown error inside an async route
// handler ends up here — no need to wrap every controller in try/catch.
export function notFoundHandler(req, res, next) {
  next(ApiError.notFound(`Маршрут ${req.method} ${req.originalUrl} не найден`));
}

export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    });
  }

  // Prisma "unique constraint failed"
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: `Значение поля "${err.meta?.target}" уже используется`,
    });
  }

  // Prisma "record not found"
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Запись не найдена",
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Внутренняя ошибка сервера",
    ...(env.isProduction ? {} : { stack: err.stack }),
  });
}
