import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function handler(req, res) {
  const { method, body, query } = req;

  const getData = async () => {
    const follow = await prisma.follow_table.findUnique({
      where: {
        id: Number(query.id),
      }, 
      select: {
        follow_list: true,
      },
    });
    res.json(follow);
  };

  switch (method) {
    case "GET":
      getData();
      break;
    default:
      return;
  }
}
export default handler;
