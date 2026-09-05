import { ApiError } from "../../utils/ApiError.js";
import { sendSuccess } from "../../utils/ApiResponse.js";
import * as mediaService from "./media.service.js";

export async function uploadMediaController(req, res) {
  if (!req.file) throw ApiError.badRequest("Файл не передан");
  const media = await mediaService.saveUploadedFile(req.file, req.uploadSubdir, req.body.alt);
  sendSuccess(res, { statusCode: 201, data: media });
}

export async function listMediaController(req, res) {
  const result = await mediaService.listMedia(req.query);
  sendSuccess(res, { data: result.items, meta: result.meta });
}

export async function updateMediaController(req, res) {
  const media = await mediaService.updateMediaAlt(req.params.id, req.body.alt);
  sendSuccess(res, { data: media });
}

export async function deleteMediaController(req, res) {
  await mediaService.deleteMedia(req.params.id);
  sendSuccess(res, { data: null });
}
