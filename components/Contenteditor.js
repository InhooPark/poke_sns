import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

const Contenteditor = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const { setPageStatus } = useContext(Statusgroup);
<<<<<<< HEAD
  const {setData} = useContext(InfoUser);
=======
>>>>>>> c56dac036ec7bfe614ca1be94593357be93f7e9e

  const create = async (e) => {
    e.preventDefault();
    await axios.post("/api/", {
      content: e.target.content.value,
      user_id: session.user.id,
      name: user.name,
      pro_img: user.pro_img,
      credit: user.credit,
    });

    setPageStatus("LIST");
  };
  const getUser = () => {
    axios
      .get("/api/auth/who", {
        params: {
          id: session.user.id,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <form className="Contenteditor" onSubmit={create}>
        <section className="btn">
          <button onClick={() => setPageStatus("LIST")}>취소</button>
          <button type={"submit"}>완료</button>
        </section>
        {/* 프로필 이미지 */}
        <p name={"img"}></p>
        {/* 글 작성란 */}
        <p>
          <textarea type="text" name="content" className="contentBox" placeholder="무슨 일이 있었나요?" />
        </p>
      </form>
    </div>
  );
};

export default Contenteditor;
