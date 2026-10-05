import * as teachersService from "./teachers.service.js";

export async function listTeachersController(req, res) {
  const { department } = req.query;
  const teachers = await teachersService.listTeachers({ department });
  res.json({ success: true, data: teachers });
}

export async function getTeacherController(req, res) {
  const id = parseInt(req.params.id, 10);
  const teacher = await teachersService.getTeacherById(id);
  res.json({ success: true, data: teacher });
}

export async function createTeacherController(req, res) {
  const teacher = await teachersService.createTeacher(req.body);
  res.status(201).json({ success: true, data: teacher });
}

export async function updateTeacherController(req, res) {
  const id = parseInt(req.params.id, 10);
  const teacher = await teachersService.updateTeacher(id, req.body);
  res.json({ success: true, data: teacher });
}

export async function deleteTeacherController(req, res) {
  const id = parseInt(req.params.id, 10);
  await teachersService.deleteTeacher(id);
  res.json({ success: true, message: "Преподаватель успешно удален" });
}
