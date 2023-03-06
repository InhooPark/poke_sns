import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
const prisma = new PrismaClient();

async function handler(req, res) {
  const { method, body, query } = req;

  const getData = async () => {
    console.log(query);
    const favorite = await prisma.follow_table.findUnique({
      where: {
        id: Number(query.id),
      },
    });
    res.json(favorite);
  };

  const postData = async () => {
    const check = await prisma.follow_table.findUnique({
      where: {
        id: body.id,
      },
    });
    let a = check.follow_list;
    let aa = a.split(",");

    if (aa.includes(body.user_id.toString())) {
      return { message: "중복" };
    }
    let result = check.follow_list + "," + body.user_id;
    const update = await prisma.follow_table.update({
      where: {
        id: body.id,
      },
      data: {
        follow_list: result,
      },
    });
  };

  switch (method) {
    case "GET":
      getData();
      break;
    case "POST":
      postData();
      break;
    default:
      return;
  }
}

export default handler;
