import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/List.module.scss";
import { useSession } from "next-auth/react";
import { Statusgroup } from "@/context/StatusContext";
import Item from "./Item";

const List = () => {
  const { data: session } = useSession();
  const { data, setData, contentlist, setContentlist, arr, setArr, result, setResult } = useContext(Statusgroup);

  //데이터 조회 dataGet();
  const getFollowList = async () => {
    if (arr !== undefined) {
      let rearr = [];
      const wait =
        arr &&
        arr.map(async (value) => {
          await axios.put("/api", { id: value }).then((res) => {
            res.data.map((value) => {
              rearr.push(value);
            });
          });
        });

      await Promise.all(wait);
      setResult(rearr);
    }
  };

  const dataGet = () => {
    if (contentlist) {
      axios.get("/api/").then((res) => {
        setData(res.data);
      });
    } else {
      axios
        .get("/api/followlist", {
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
    }
  };

  const setfollowlist = () => {
    setContentlist(false);
  };
  const setlist = () => {
    setContentlist(true);
  };

  useEffect(() => {
    dataGet();
  }, [contentlist]);

  useEffect(() => {
    if (!contentlist) {
      getFollowList();
    }
  }, [arr]);

  useEffect(() => {
    if (result.length) {
      result.sort((a, b) => {
        return b.id - a.id;
      });
    }
    setData(result);
  }, [result]);

  if (data === undefined)
    return (
      <div className={styles.load}>
        <img src="/img/loadimg/pika_heart.webp"></img>
      </div>
    );
  else {
    return (
      <div className={styles.listBox}>
        <div className={styles.list_btn_box}>
          <button className={contentlist ? styles.on : ""} type="button" onClick={setlist}>
            전체
          </button>
          <button className={contentlist ? "" : styles.on} type="button" onClick={setfollowlist}>
            팔로우
          </button>
        </div>
        <ul>{data.length === 0 ? <>팔로우한 사람이 없습니다.</> : data && data.map((obj, key) => <Item obj={obj} key={key} dataGet={dataGet}></Item>)}</ul>
      </div>
    );
  }
};

export default List;
