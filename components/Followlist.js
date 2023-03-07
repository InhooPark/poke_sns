import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Style from "@/styles/maincon.module.scss";

const Followlist = () => {
  const [users, setUsers] = useState();
  const { data: session } = useSession();
  const [data, setData] = useState();

  const getUsersData = () => {
    let arr = [];
    users &&
      users.map((list, k) => {
        if (k === 0) {
          return;
        } else {
          axios
            .get("/api/auth/who", {
              params: {
                id: list,
              },
            })
            .then((res) => {
              arr[k - 1] = res.data;
            });
        }
      });
    setData(arr);
  };

  const getUsers = () => {
    axios
      .get("/api/followlist/", {
        params: {
          id: session.user.id,
        },
      })
      .then((res) => {
        let arr = res.data.follow_list.split(",");
        setUsers(arr);
      });
    getUsersData();
  };

  const favoriteUser = (user) => {
    // console.log(user.id);
    console.log("unfollow?");
  };

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getUsersData();
  }, [users]);

  if (data !== undefined) {
    return (
      <>
        {data.map((user) => {
          return (
            <div key={user.id} className={Style.follow_list}>
              <div className={Style.follow_list_pro_img}>
                <img src={`/img/poke_profile_img/pokballpixel-${user.pro_img}.png`}></img>
              </div>
              <div className={Style.follow_list_info}>
                <p className={Style.follow_list_name}>{user.name === "" ? "설정된 이름이 없습니다." : user.name}</p>
                <p className={Style.follow_list_email}>@{user.email}</p>
              </div>
              <div className={Style.follow_list_heart} onClick={() => favoriteUser(user)}>
                <img src="/img/svg/heart-fill.svg" />
              </div>
            </div>
          );
        })}
      </>
    );
  }
};

export default Followlist;
