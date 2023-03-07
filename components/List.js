import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "@/styles/List.module.scss";
// import Image from "next/image";

const List = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  //데이터 조회 dataGet();
  const dataGet = () => {
    axios.get('/api/').then((res) => {
      setData(res.data);
    })
  }

  
    //데이터 삭제 dataDelete();
  function dataDelete(id) {
    axios.delete(`/api/${id}`,);
    dataGet();
  }

  useEffect(() => { dataGet() }, [])

  


  if (!data.length) return (
    <div>
      <p>무슨 일이 일어나고 있나요?</p>
    </div>
  )
  return (
    <div className={styles.listBox}>
      <ul>
        {
          data && data.map((obj) => (
            <li className={styles.detail_list} key={obj.id}>
              {/* 프로필로 이동 */}
              <div className={styles.profileInfo}>
                <button>
                  {obj.img}
                </button>
                <p className={styles.user}>
                  @{obj.name}
                </p>
                <p className={styles.date}>{obj.date}hours</p>
              </div>
              <p className={styles.detail}>{obj.content}</p>
              <section className={styles.btn}>
                <button className={styles.like}>
                  </button>
                <button className={styles.btn2}>
                  <ul>
                    <li>
                    <p className={styles.update} onClick={() => router.push({ pathname: 'src/Update', query: obj })}>수정</p>
                    </li>
                    <li>
                    <p className={styles.remove} onClick={() => dataDelete(obj.id)}>삭제</p>
                    </li>
                  </ul>
                </button>
                <button className={styles.share}>
                </button>
              </section>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default List;
