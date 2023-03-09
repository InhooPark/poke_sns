import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function handler(req, res) {
  const { method, body, query } = req;
  console.log(body)

  const update = async () => {
    await prisma.user_table.update({
      where: {
        id: body.id
      },
      data: {
        credit: body.credit-5
      }
    });
    res.send("크레딧삭제")
  }
  switch (method) {
    case "DELETE":
      dataDelete();
      break;
    case "PUT":
      update();
      break;
    default:
      return;
  }
}
