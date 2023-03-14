import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Item from "./Item";
import styles from "@/styles/List.module.scss";
import { Statusgroup } from "@/context/StatusContext";

const Trend = () => {
  const [trendlist, setTrendlist] = useState();
  const { data } = useContext(Statusgroup);

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

  useEffect(() => {
    getTrendlist();
  }, [data]);

  return (
    <div className={styles.listBox}>
      <ul>{trendlist && trendlist.map((obj, key) => <Item obj={obj} key={key}></Item>)}</ul>
    </div>
  );
};

export default Trend;
