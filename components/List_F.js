import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/List.module.scss";
import { useSession } from "next-auth/react";
import { Statusgroup } from "@/context/StatusContext";
// import Image from "next/image";

const List_F = () => {

  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const { data: session } = useSession();

  useEffect(()=>{
    dataGet();
  },[])

  //데이터 조회 dataGet();
  const dataGet = () => {
    axios.put("/api/followlist", {id:session.user.id}).then((res)=>{
      let fData = res.data.follow_list;
      let ar = fData.split(",");
      setList(ar)
    })
  }

  const dataL = async()=> {
    let wait = list.map((obj)=>{
      axios.get(`/api/followlist`,{
        params: {
          id:obj
        }
      })
      .then(res=>{
        setData(res.data)
      })
    })
    await Promise.all(wait)
  }

    useEffect(() => {
      dataL();
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
              </section>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default List_F;
