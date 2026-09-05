import { sendSuccess } from "../../utils/ApiResponse.js";
import * as applicationsService from "./applications.service.js";

// Public: user submits an application from /apply
export async function createApplicationController(req, res) {
  const application = await applicationsService.createApplication(req.body);
  sendSuccess(res, {
    statusCode: 201,
    data: application,
    message: "Заявка успешно принята",
  });
}

// Admin: list all applications with pagination and filters
export async function listApplicationsController(req, res) {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 20;
  const result = await applicationsService.listApplications({
    ...req.query,
    page,
    pageSize,
  });
  sendSuccess(res, { data: result.items, meta: result.meta });
}

// Admin: update application status or notes
export async function updateApplicationController(req, res) {
  const application = await applicationsService.updateApplication(
    req.params.id,
    req.body
  );
  sendSuccess(res, { data: application });
}

// Admin: delete application
export async function deleteApplicationController(req, res) {
  await applicationsService.deleteApplication(req.params.id);
  sendSuccess(res, { message: "Заявка удалена" });
}
