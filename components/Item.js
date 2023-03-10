import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/List.module.scss";
import { useSession } from "next-auth/react";
import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import { InfoUser } from "@/context/infoContext";

const Item = ({ obj, dataGet }) => {
  const { data: session } = useSession();
  const [infoMod, setInfoMod] = useState(false);
  const { setPageStatus, setListUpdate } = useContext(Statusgroup);
  const { who } = useContext(InfoUser);
  const [followlist, setFollowlist] = useState();
  let today = new Date();

  const getFollowList = () => {
    axios
      .get("/api/follow", {
        params: {
          id: session.user.id,
        },
      })
      .then((res) => {
        let arr = res.data.follow_list.split(",");
        setFollowlist(arr);
      });
  };

  const dataUpdate = (obj) => {
    setInfoMod(!infoMod);
    if (session.user.id == obj.user_id) {
      setListUpdate(obj);
      setPageStatus("UPDATE");
    } else {
      console.log("불일치");
    }
  };
  const dataDelete = async (obj) => {
    setInfoMod(!infoMod);
    if (session.user.id == obj.user_id) {
      await axios.delete(`/api/${obj.id}`);
      await axios.put("/api/credit", { id: session.user.id, credit: who.credit });
    } else {
      alert("본인이 아니에요");
    }

    dataGet();
  };

  const userFollow = (id, bool) => {
    let aa = "";
    followlist.map((list, k) => {
      if (k === 0) {
        return;
      } else {
        aa += "," + list;
      }
    });

    if (bool) {
      //언팔로우
      setInfoMod(!infoMod);
      axios.post("/api/follow", { type: "unfollow", id: session.user.id, follow_list: aa, user_id: id });
      location.reload();
    } else {
      //팔로우
      setInfoMod(!infoMod);
      axios.post("/api/follow", { type: "follow", id: session.user.id, follow_list: aa, user_id: id });
      location.reload();
    }
  };
  const infoModModal = () => {
    setInfoMod(!infoMod);
  };

  useEffect(() => {
    getFollowList();
  }, []);

  const heart = async (obj) => {
    //obj.e >> e.target활용
    //obj.obj >> 글에 정보 ex) obj.obj.content, date, id, like_count, name, pro_img, user_id
    console.log(obj)
    obj.e.target.classList.toggle(styles.fillheart);
    if(obj.e.target.classList.contains(styles.fillheart)) {
      //list_table에 like_user 에 자신 아이디
      axios.get(`/api/like`, obj.obj)
      console.log("꽉찬하트")
    } else {
      //list_table에 like_user 라이크 추가
      axios.put(`/api/like`, {data:obj.obj, id:session.user.id})
      console.log("빈 하트")
    }
  }
  return (
    <>
      <li className={styles.detail_list} key={obj.id}>
        {/* 프로필로 이동 */}
        <div className={styles.profileInfo}>
          <div className={styles.profile_info_wrap}>
            <div className={styles.profile_img}>
              <img src={`/img/poke_profile_img/pokballpixel-${obj.pro_img}.png`}></img>
            </div>
            <div className={styles.profile_name_email_wrap}>
              <div className={styles.profile_name_wrap}>
                <p className={styles.user}>@&nbsp;</p>
                <p className={styles.user}>{obj.name}</p>
              </div>
              <p className={styles.date}>{obj.date}hours</p>
            </div>
          </div>
          <div className={styles.info_mod_wrap} onClick={infoModModal}>
            <svg width="4" height="20.5" viewBox="0 0 8 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 32.9853C6.20641 32.9853 8 34.7789 8 36.9853C8 39.1917 6.20641 40.9853 4 40.9853C1.79359 40.9853 0 39.1917 0 36.9853C0 34.7789 1.79359 32.9853 4 32.9853ZM4 16.9853C6.20641 16.9853 8 18.7789 8 20.9853C8 23.1917 6.20641 24.9853 4 24.9853C1.79359 24.9853 0 23.1917 0 20.9853C0 18.7789 1.79359 16.9853 4 16.9853ZM4 0.985352C6.20641 0.985352 8 2.77894 8 4.98535C8 7.19174 6.20641 8.98535 4 8.98535C1.79359 8.98535 0 7.19174 0 4.98535C0 2.77894 1.79359 0.985352 4 0.985352Z"
                fill="#E36E6E"
              />
            </svg>
            {session.user.id !== obj.user_id ? (
              <div className={infoMod ? `${styles.info_mod_btn_wrap} ${styles.on}` : styles.info_mod_btn_wrap}>
                <p className={styles.follow} onClick={() => userFollow(obj.user_id, followlist && followlist.includes(obj.user_id.toString()))}>
                  {followlist && followlist.includes(obj.user_id.toString()) ? "언팔로우" : "팔로우"}
                </p>
              </div>
            ) : (
              <div className={infoMod ? `${styles.info_mod_btn_wrap} ${styles.on}` : styles.info_mod_btn_wrap}>
                <p className={styles.update} onClick={() => dataUpdate(obj)}>
                  수정
                </p>
                <p className={styles.remove} onClick={() => dataDelete(obj)}>
                  삭제
                </p>
              </div>
            )}
          </div>
        </div>
        <pre className={styles.detail}>{obj.content}</pre>
        <section className={styles.btn}>
          <button className={styles.heart} onClick={(e)=>heart({e, obj})}></button>
          <button className={styles.share}></button>
        </section>
      </li>
    </>
  );
};

export default Item;
