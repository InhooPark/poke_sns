import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function handler(req, res) {
  const { method, body, query } = req;

  const putData = async () => {
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

  const getData = async() => {
    const b = await prisma.list_table.findMany({
      where : {
        user_id : Number(query.id)
      },
      select : {
        id:true,
        name:true,
        user_id:true,
        content:true,
        date:true,
        like:true,
        pro_img:true
      }
    })
    res.json(b)
  }

  switch (method) {
    case "PUT":
      putData();
      break;
    case "GET":
      getData();
    default:
      return;
  }
}
export default handler;
