// Every successful response follows the same envelope so the frontend/admin
// panel can rely on a single shape: { success, data, meta? }.
export function sendSuccess(res, { statusCode = 200, data = null, meta = undefined }) {
  return res.status(statusCode).json({
    success: true,
    data,
    ...(meta ? { meta } : {}),
  });
}
