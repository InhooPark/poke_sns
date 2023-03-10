import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";
import styles from "@/styles/List.module.scss";
import { useSession } from "next-auth/react";
import { Statusgroup } from "@/context/StatusContext";

const Trend = () => {
  const [trendlist, setTrendlist] = useState();
  const { data: session } = useSession();
  const { arr, setArr } = useContext(Statusgroup);

  const getTrendlist = () => {
    let arr = [];
    axios.get("/api/").then((res) => {
      res.data.sort((a, b) => {
        return b.like_count - a.like_count;
      });
      for (let i = 0; i < 5; i++) {
        arr[i] = res.data[i];
      }
      setTrendlist(arr);
    });
  };

  const dataGet = () => {
    axios
      .get("/api/follow", {
        params: {
          id: session.user.id,
        },
      })
      .then((res) => {
        if (res.data.follow_list != "") {
          setArr(res.data.follow_list.split(","));
        } else {
          return;
        }
      });
  };

  useEffect(() => {
    getTrendlist();
    dataGet();
  }, []);

  return (
    <div className={styles.listBox}>
      <ul>{trendlist && trendlist.map((obj, key) => <Item obj={obj} key={key} dataGet={dataGet}></Item>)}</ul>
    </div>
  );
};

export default Trend;
