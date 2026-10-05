import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/ApiError.js";

export async function listTeachers({ department } = {}) {
  const where = department && department !== "all" ? { department } : {};
  return prisma.teacher.findMany({
    where,
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
}

export async function getTeacherById(id) {
  const teacher = await prisma.teacher.findUnique({ where: { id } });
  if (!teacher) throw ApiError.notFound("Преподаватель не найден");
  return teacher;
}

export async function createTeacher(data) {
  return prisma.teacher.create({
    data: {
      name: data.name,
      subject: data.subject,
      role: data.role || "",
      desc: data.desc || "",
      department: data.department || "all",
      imageUrl: data.imageUrl || "/images/teachers/galina.jpg",
      order: data.order !== undefined ? parseInt(data.order, 10) : 0,
    },
  });
}

export async function updateTeacher(id, data) {
  await getTeacherById(id);
  const payload = { ...data };
  if (payload.order !== undefined) payload.order = parseInt(payload.order, 10);
  return prisma.teacher.update({
    where: { id },
    data: payload,
  });
}

export async function deleteTeacher(id) {
  await getTeacherById(id);
  return prisma.teacher.delete({ where: { id } });
}
