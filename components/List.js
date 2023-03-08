import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/List.module.scss";
import { useSession } from "next-auth/react";
import { Statusgroup } from "@/context/StatusContext";
// import Image from "next/image";

const List = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();
  const { pageStatus, setPageStatus, listUpdate, setListUpdate } = useContext(Statusgroup);

  //데이터 조회 dataGet();
  const dataGet = () => {
    axios.get("/api/").then((res) => {
      setData(res.data);
    });
  };

  //데이터 삭제 dataDelete();
  function dataDelete(obj) {
    if (session.user.id == obj.user_id) {
      axios.delete(`/api/${obj.id}`);
    } else {
      alert("본인이 아니에요");
    }
    dataGet();
  }

  function dataUpdate(obj) {
    if (session.user.id == obj.user_id) {
      setListUpdate(obj);
      setPageStatus("UPDATE");
    } else {
      console.log("불일치");
    }
  }

  useEffect(() => {
    dataGet();
  }, []);

  if (!data.length)
    return (
      <div className={styles.load}>
        <img src="/img/loadimg/pika_heart.webp"></img>
      </div>
    );
  return (
    <div className={styles.listBox}>
      <ul>
        {data &&
          data.map((obj) => (
            <li className={styles.detail_list} key={obj.id}>
              {/* 프로필로 이동 */}
              <div className={styles.profileInfo}>
                <div className={styles.profile_img}>
                  <img src={`/img/poke_profile_img/pokballpixel-${obj.pro_img}.png`}></img>
                </div>
                <p className={styles.user}>@{obj.name}</p>
                <p className={styles.date}>{obj.date}hours</p>
              </div>
              <p className={styles.detail}>{obj.content}</p>
              <section className={styles.btn}>
                <button className={styles.like}></button>

                {session.user.id !== obj.user_id ? (
                  <></>
                ) : (
                  <button className={styles.btn2}>
                    <ul>
                      <li>
                        <p className={styles.update} onClick={() => dataUpdate(obj)}>
                          수정
                        </p>
                      </li>
                      <li>
                        <p className={styles.remove} onClick={() => dataDelete(obj)}>
                          삭제
                        </p>
                      </li>
                    </ul>
                  </button>
                )}
                <button className={styles.share}></button>
              </section>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default List;
