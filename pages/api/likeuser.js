import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function handler(req, res) {
  const {method , body , query} = req;
  const update = async() => {
    try{
      //aa에 라이크 유저를 집어넣고 내것도 집어 넣음
      let aa = body.data.like_user + "," + body.id;
      let bbb = (aa.split(',').length - 1);
      console.log(bbb)
      if(body.type == "like") {
        await prisma.list_table.update({
          where: {
            id: body.data.id
          },
          data: {
            like_count: bbb,
            like_user: aa
          }
        })
      } else if (body.type == "unlike"){
        //aa를 콤마로 나눔
        let bb = aa.split(',');
        //bb를 내 아이디랑 비교해서 내 아이디 제외하고 minus에 박음
        let minus = bb.filter((obj) => obj != body.id)
        // console.log("이게 떠야 정상", minus.toString())
        // console.log(body)
        console.log(bbb-1);
        
        await prisma.list_table.update({
          where: {
            id: body.data.id
          },
          data: {
            like_user: minus.toString(),
            like_count: Number(bbb-1)
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