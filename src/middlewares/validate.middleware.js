import { ApiError } from "../utils/ApiError.js";

// Usage: validate({ body: someZodSchema, params: otherZodSchema })
// Validated/coerced values are written back onto req so controllers can
// trust req.body/req.params/req.query afterwards.
export function validate(schemas) {
  return (req, res, next) => {
    for (const key of ["body", "params", "query"]) {
      const schema = schemas[key];
      if (!schema) continue;

      const result = schema.safeParse(req[key]);
      if (!result.success) {
        throw ApiError.badRequest(
          "Ошибка валидации данных",
          result.error.flatten().fieldErrors,
        );
      }
      req[key] = result.data;
    }
    next();
  };
}
