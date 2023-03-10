import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function handler(req, res) {
  const { method, body, query } = req;

  const getData = async () => {
    if (query.type == "owner") {
      const contentOwner = await prisma.user_table.findUnique({
        where: {
          id: Number(query.id),
        },
        select: {
          pro_img: true,
          name: true,
        },
      });
      res.json(contentOwner);
    } else {
      const owner = await prisma.user_table.findUnique({
        where: {
          id: Number(query.id),
        },
        select: {
          id: true,
          pro_img: true,
          email: true,
          name: true,
          req: true,
          credit: true,
        },
      });
      res.json(owner);
    }
  };

  switch (method) {
    case "GET":
      getData();
      break;
    default:
      return;
  }
}
