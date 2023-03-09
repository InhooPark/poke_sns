import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

export default function handler(req, res) {
  const { method, body } = req;
  //포켓몬 데이터 뿌리기
  const getEncyclo = async () => {
    const encycloData = await prisma.poke_table.findMany();
    res.json(encycloData);
    return encycloData;
  };
  //보유중인 포켓몬 데이터 뽑아내기
  const update = async () => {
    const data = await prisma.have_poke.findUnique({
      where: {
        id: body.user.id,
      },
      select: {
        id: true,
        poke_id: true,
      },
    });
    res.json(data);
  };
  //구매한 포켓몬 추가
  const getPost = async () => {
    await prisma.have_poke.update({
      where: {
        id: body.id,
      },
      data: {
        poke_id: body.data,
      },
    });
  };
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
