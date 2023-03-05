import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function handler(req, res) {
  const { method, body, query } = req;

  const getData = async () => {
    const owner = await prisma.user_table.findUnique({
      where: {
        id: Number(query.id),
      },
      select: {
        id: true,
        pro_img: true,
        email: true,
        name: true,
        credit: true,
        rep: true,
      },
    });
    // console.log(owner);
    res.json(owner);
  };

  switch (method) {
    case "GET":
      getData();
      break;
    default:
      return;
  }
}
