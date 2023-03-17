import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function handler(req, res) {
  const { method, body, query } = req;

  const update = async () => {
    if (body.credit < 5) {
      const listUpdate = await prisma.user_table.update({
        where: {
          id: body.id,
        },
        data: {
          credit: 0,
        },
      });
      res.send("크레딧삭제");
      } else {
      const listUpdate = await prisma.user_table.update({
        where: {
          id: body.id,
        },
        data: {
          credit: body.credit - 5,
        },
      });
      res.send("크레딧삭제");
    }
  };
  switch (method) {
    case "PUT":
      update();
      break;
    default:
      return;
  }
}
