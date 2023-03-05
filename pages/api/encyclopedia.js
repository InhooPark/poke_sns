import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

export default function handler(req, res) {
  const { method } = req;

  const getEncyclo = async () => {
    const encycloData = await prisma.poke_table.findMany();
    res.json(encycloData);
    return encycloData;
  };

  switch (method) {
    case "GET":
      getEncyclo();
      break;
    default:
      return;
  }
}
