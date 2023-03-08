import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/List.module.scss";

const Mylist = () => {
  const { data: session } = useSession();
  const [mycomment, setMycomment] = useState([]);

  const getMyList = async () => {
    console.log(session.user.id);
    await axios
      .get("/api/mylist", {
        params: {
          id: session.user.id,
        },
      })
      .then((res) => {
        setMycomment(res.data);
      });
  };

  useEffect(() => {
    getMyList();
  }, []);

  if (!mycomment.length)
    return (
      <div className={styles.load}>
        <img src="/img/loadimg/pika_heart.webp"></img>
      </div>
    );
  else {
    return (
      <div className={styles.listBox}>
        <ul>
          {mycomment &&
            mycomment.map((obj) => (
              <li className={styles.detail_list} key={obj.id}>
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
  }
};

export default Mylist;
