
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

export default function handler(req, res) {
  const { method, body, query } = req;
  //query.id(유저 정보)
  const getEncyclo = async () => {
    try{
      const userData = await prisma.have_poke_table.findUnique({
        where: {
          id: Number(query.id)
        },
        select:{
          id : true,
          poke_id: true,
        }
      })
      res.json(userData);
    }catch(err){
      res.send(err);
    }
  };

  const update = async () => {
    // body.aa <<클릭한 포켓몬
    await prisma.have_poke.update({
      where: {
        id : query.id,
      },
      data: {
        poke_id: body.aa
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
    default:
      return;
  }
}
