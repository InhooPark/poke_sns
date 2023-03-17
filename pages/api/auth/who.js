import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method, body, query } = req;

  const getData = async () => {
    try {
      if (query.type === "owner") {
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
            rep: true,
            credit: true,
            badge_list: true,
          },
        });
        res.json(owner);
      }
    } catch (err) {
      res.send(err);
    }
  };
  const putData = async () => {
    console.log(body);
    try {
      const updateBadge = await prisma.user_table.update({
        where: {
          id: Number(body.id),
        },
        data: {
          badge_list: body.data.toString(),
        },
      });
      res.send("success");
    } catch (err) {
      res.send(err);
    }
  };

  switch (method) {
    case "GET":
      await getData();
      break;
    case "PUT":
      await putData();
    default:
      return;
  }
}
