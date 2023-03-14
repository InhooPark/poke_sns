import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/List.module.scss";
import Item from "./Item";

const Mylist = () => {
  const { data: session } = useSession();
  const [mycomment, setMycomment] = useState([]);

  const getMyList = async () => {
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
  }, [session]);

  if (!mycomment.length)
    return (
      <div className={styles.load}>
        <img src="/img/loadimg/pika_heart.webp" alt=""></img>
      </div>
    );
  else {
    return (
      <div className={styles.listBox}>
        <ul>{mycomment && mycomment.map((obj, key) => <Item obj={obj} key={key} dataGet={getMyList}></Item>)}</ul>
      </div>
    );
  }
};

export default Mylist;
