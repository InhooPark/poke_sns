import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/Contenteditor.module.scss";

const Contenteditor = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const { setPageStatus } = useContext(Statusgroup);

  const create = async (e) => {
    e.preventDefault();
    await axios.post("/api/", {
      content: e.target.content.value,
      user_id: session.user.id,
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
  }, [session]);

  return (
    <div>
      <form className={styles.Contenteditor} onSubmit={create}>
        <div className={styles.profile}>
          <div className={styles.pro_img}>
            <img src={`/img/poke_profile_img/pokballpixel-001.png`} alt=""></img>
          </div>
        </div>
        <div className={styles.textBox}>
          <textarea type="text" name="content" placeholder="무슨 일이 있었나요?" />
          <section>
            <button className={styles.Dbtn} onClick={() => router.push("/")}>
              취소
            </button>
            <button className={styles.Cbtn} type={"submit"}>
              완료
            </button>
          </section>
        </div>
      </form>
    </div>
  );
};

export default Contenteditor;
