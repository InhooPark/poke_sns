import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import Style from "@/styles/maincon.module.scss";
import { InfoUser } from "@/context/InfoContext";

const Followlist = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const { myfollowlist } = useContext(InfoUser);

  // 탈퇴한 회원일때 예외처리 해야함 꼭!

  const getUsersData = async () => {
    let arr = [];
    const pro1 = users.map(async (list, k) => {
      await axios
        .get("/api/auth/who", {
          params: {
            id: list,
          },
        })
        .then((res) => {
          arr[k] = res.data;
        });
    });
    await Promise.all(pro1);

    setData(arr);
  };

  const getUsers = () => {
    setUsers(myfollowlist);
  };

  const favoriteUser = (id) => {
    let result = users.filter((obj) => obj != id);
    axios.put("/api/follow", { id: session.user.id, data: result });
    location.reload();
  };

  useEffect(() => {
    getUsers();
  }, [myfollowlist]);
  useEffect(() => {
    getUsersData();
  }, [users]);

  if (data.length) {
    return (
      <>
        {data.map((user, key) => {
          return (
            <div key={!user ? key : user.id} className={Style.follow_list}>
              <div className={Style.follow_list_pro_img}>
                {!user ? (
                  <img src="/img/poke_profile_img/pokballpixel-000.png" alt=""></img>
                ) : (
                  <img src={`/img/poke_profile_img/pokballpixel-${user.pro_img}.png`} alt=""></img>
                )}
              </div>
              <div className={Style.follow_list_info}>
                <p className={Style.follow_list_name}>{!user ? "탈퇴한 회원입니다." : user.name === "" ? "설정된 이름이 없습니다." : user.name}</p>
                <p className={Style.follow_list_email}>@{user ? user.email : "탈퇴한 회원입니다."}</p>
              </div>
              <div className={Style.follow_list_heart} onClick={() => favoriteUser(user.id)}>
                <img src="/img/svg/heart-fill.svg" alt="" />
              </div>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <div className={Style.follow_load}>
          <img src="/img/loadimg/pika_heart.webp" alt=""></img>
        </div>
      </>
    );
  }
};

export default Followlist;
