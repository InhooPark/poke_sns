import { useContext, useEffect } from "react";
import axios from "axios";
import styles from "@/styles/List.module.scss";
import { useSession } from "next-auth/react";
import { Statusgroup } from "@/context/StatusContext";
import Item from "./Item";
const List = () => {
  const { data: session } = useSession();
<<<<<<< HEAD
  const { pageStatus, setPageStatus, listUpdate, setListUpdate } = useContext(Statusgroup);
  const [contentlist, setContentlist] = useState(true);
  const {who, data, setData} = useContext(InfoUser)

  const [arr, setArr] = useState();
  const [result, setResult] = useState([]);
  console.log(data)
=======
  const { data, setData, contentlist, setContentlist, arr, setArr, result, setResult } = useContext(Statusgroup);
>>>>>>> c56dac036ec7bfe614ca1be94593357be93f7e9e
  //데이터 조회 dataGet();
  const getFollowList = async () => {
    if (arr !== undefined) {
      let rearr = [];
      const wait =
        arr &&
        arr.map(async (value, key) => {
          if (key === 0) {
            return;
          } else {
            await axios.put("/api", { id: value }).then((res) => {
              res.data.map((vv) => {
                rearr.push(vv);
              });
            });
          }
        });

      await Promise.all(wait);
      setResult(rearr);
    }
  };

  const dataGet = () => {
    let arr = [];
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
          arr = res.data.follow_list.split(",");
          setArr(arr);
        });
    }
  };

<<<<<<< HEAD
  const dataDelete = async(obj) => {
    if (session.user.id == obj.user_id) {
      await axios.delete(`/api/${obj.id}`, {
        params: {
          id : session.user.id,
          credit: who.credit,
          user_id: who.id
        }
      });
      await axios.put(`/api/credit` , {id: who.id, credit: who.credit})
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
=======
>>>>>>> c56dac036ec7bfe614ca1be94593357be93f7e9e
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
    getFollowList();
  }, [arr]);
  useEffect(() => {
    if (result.length) {
      result.sort((a, b) => {
        return b.id - a.id;
      });
      setData(result);
    }
  }, [result]);

  if (data == undefined)
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
        <ul>{data && data.map((obj, key) => <Item obj={obj} key={key} dataGet={dataGet}></Item>)}</ul>
      </div>
    );
  }
};

export default List;
