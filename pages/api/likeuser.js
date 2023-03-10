import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function handler(req, res) {
  const {method , body , query} = req;
  
  const update = async() => {
    try{
      //aa에 라이크 유저를 집어넣고 내것도 집어 넣음
      let aa = body.data.like_user + "," + body.id;
      if(body.type == "like") {
        await prisma.list_table.update({
          where: {
            id: body.data.id
          },
          data: {
            like_user: aa
          }
        })
      } else if (body.type == "unlike"){
        //aa를 콤마로 나눔
        let bb = aa.split(',');
        //bb를 내 아이디랑 비교해서 내 아이디 제외하고 cc에 박음
        let cc = bb.filter((obj) => {obj.id != body.id})
        
        await prisma.list_table.update({
          where: {
            id: body.data.id
          },
          data: {
            like_user: cc.toString()
          }
        })
      }
      res.send({message: 'get'})
    } catch(err) {
      res.send(err);
    }
  }


  switch (method) {
    case "PUT" : 
      update();
    break;
  }
}

export default handler;