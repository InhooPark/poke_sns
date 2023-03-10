import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function handler(req, res) {
  const {method , body , query} = req;

  const update = async () => {
    console.log(body,"업데이트")
  }
  
  const getData = async () => {
    console.log(body,"겟데이터")
  }


  switch (method) {
    case "PUT" : 
      update();
    break;
    case "GET" :
      getData();
    break;
  }
}

export default handler;
