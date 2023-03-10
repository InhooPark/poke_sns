import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

export default function handler(req, res) {
  const { method, body } = req;

  //구매 후 크레딧 업데이트
  const update = async () => {
    await prisma.user_table.update({
      where: {
        id: body.id,
      },
      data: {
        credit: body.data,
      },
    });
  };

  switch (method) {
    // case "GET":
    //   getEncyclo();
    //   break;
    case "PUT":
      update();
      break;
    default:
      return;
  }
}
