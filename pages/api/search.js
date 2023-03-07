import { executeQuery } from "./db";

const handler = async (req, res) => {
  const { method, body, query } = req;

  const putData = async () => {
    try {
      // prisma의 rawquery 미지원으로 인한 mysql module 설치
      let users = await executeQuery(
        `select id, pro_img, name, email from user_table where email like '%${body.value}%' or name like '%${body.value}%' order by id DESC`
      );
      res.json(users);
    } catch (err) {
      res.send(err);
    }
  };

  switch (method) {
    case "PUT":
      putData();
      break;
    default:
      return;
  }
};

export default handler;
