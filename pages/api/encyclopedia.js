import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

export default function handler(req, res) {
  const { method, body } = req;

  const getEncyclo = async () => {
    const encycloData = await prisma.poke_table.findMany();
    res.json(encycloData);
    return encycloData;
  };

  const update = async () => {
    const data = await prisma.have_poke.findUnique({
      where: {
        id: body.user.id
      },
      select: {
        id: true,
        poke_id : true,
      }
    })
    res.json(data)
  }

  const getPost = async () => {
    await prisma.have_poke.update({
      where: {
        id: body.id
      },
      data: {
        poke_id: body.data
      }
    })
  }
  switch (method) {
    case "GET":
      getEncyclo();
      break;
    case "PUT":
      update();
      break;
    case "POST":
      getPost();
    default:
      return;
  }
}
