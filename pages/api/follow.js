import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function handler(req, res) {
  const { method, body, query } = req;

  const getData = async () => {
    try {
      const favorite = await prisma.follow_table.findUnique({
        where: {
          id: Number(query.id),
        },
      });

      if (favorite == null) {
        const newFavorite = await prisma.follow_table.create({
          data: {
            id: Number(query.id),
            follow_list: "",
          },
        });
        res.json(newFavorite);
      } else {
        res.json(favorite);
      }
    } catch (err) {
      res.send(err);
    }
  };

  const postData = async () => {
    try {
      let result = body.follow_list + "," + body.user_id;
      if (body.type == "follow") {
        const insert = await prisma.follow_table.update({
          where: {
            id: Number(body.id),
          },
          data: {
            follow_list: result,
          },
        });
      } else if (body.type == "unfollow") {
        let result1 = body.follow_list.split(",");
        let result2 = result1.filter((list) => list != body.user_id);
        let result = "";
        result2.map((list, key) => {
          if (key === 0) {
            return;
          } else {
            result += "," + list;
          }
        });

        const update = await prisma.follow_table.update({
          where: {
            id: Number(body.id),
          },
          data: {
            follow_list: result,
          },
        });
      }
    } catch (err) {
      res.send(err);
    }
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
