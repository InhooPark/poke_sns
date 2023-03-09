import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Contenteditor = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const { setPageStatus } = useContext(Statusgroup);

  const create = async (e) => {
    e.preventDefault();
    await axios.post("/api/", {
      content: e.target.content.value,
      user_id: session.user.id,
      name: user.name,
      pro_img: user.pro_img,
      credit: user.credit
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

  //id, img, name, date
  //content
  return (
    <div>
      <form className="Contenteditor" onSubmit={create}>
        {/* <Link href={"/"}>home</Link> */}
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
