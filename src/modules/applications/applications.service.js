import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/ApiError.js";

export async function createApplication(data) {
  return await prisma.application.create({
    data: {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      childGrade: data.childGrade || null,
      type: data.type || "admission",
      message: data.message || null,
    },
  });
}

export async function listApplications({ page, pageSize, status, search }) {
  const where = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { fullName: { contains: search } },
            { phone: { contains: search } },
            { message: { contains: search } },
          ],
        }
      : {}),
  };

  const [items, total, newCount] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.application.count({ where }),
    prisma.application.count({ where: { status: "NEW" } }),
  ]);

  return {
    items,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      newCount,
    },
  };
}

export async function updateApplication(id, data) {
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app) throw ApiError.notFound("Заявка не найдена");

  return await prisma.application.update({
    where: { id },
    data: {
      ...(data.status ? { status: data.status } : {}),
      ...(data.notes !== undefined ? { notes: data.notes } : {}),
    },
  });
}

export async function deleteApplication(id) {
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app) throw ApiError.notFound("Заявка не найдена");

  return await prisma.application.delete({ where: { id } });
}
