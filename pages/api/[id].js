//
import { PrismaClient } from "@prisma/client";
import { executeQuery } from "./db";
const prisma = new PrismaClient();

export default function handler(req, res) {
  const { method, body, query } = req;

  const dataDelete = async () => {
    const listDelete = await prisma.list_table.delete({
      where: {
        id: Number(query.id),
      },
    });
  };
  const dataPut = async () => {
    const listUpdate = await prisma.list_table.update({
      where: {
        id: Number(body.id),
      },
      data: {
        content: body.content,
      },
    });
  };

  switch (method) {
    case "DELETE":
      dataDelete();
      break;
    case "PUT":
      dataPut();
      break;
    default:
      return;
  }
}
