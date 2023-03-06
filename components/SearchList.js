import { Statusgroup } from "@/context/StatusContext";
import React, { useContext, useEffect, useState } from "react";
import Style from "@/styles/maincon.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";

const SearchList = () => {
  const { searchID } = useContext(Statusgroup);
  const { data: session } = useSession();
  const [listup, setListup] = useState();

  const favoriteUser = (user) => {
    // axios.post("/api/follow", { id: session.user.id, user_id: user });
    if (listup.find((fav) => fav == user)) {
      console.log("팔로우 취소할거니?");
    } else {
      console.log("팔로우 할거니?");
    }
  };

  const favoriteListup = () => {
    axios
      .get("/api/follow", {
        params: {
          id: session.user.id,
        },
      })
      .then((res) => {
        setListup(res.data.follow_list.split(","));
      });
  };

  useEffect(() => {
    favoriteListup();
  }, []);

  if (searchID !== undefined) {
    if (searchID.length) {
      return (
        <>
          {searchID.map((user) => {
            return (
              <div key={user.id} className={Style.user_list}>
                <div className={Style.user_list_pro_img}>
                  <img src={`/img/poke_profile_img/pokballpixel-${user.pro_img}.png`}></img>
                </div>
                <div className={Style.user_list_info}>
                  <p className={Style.user_list_name}>{user.name === "" ? "설정된 이름이 없습니다." : user.name}</p>
                  <p className={Style.user_list_email}>@{user.email}</p>
                </div>
                <div className={Style.user_list_follow} onClick={() => favoriteUser(user.id)}>
                  {listup && listup.find((fav) => fav == user.id) ? <img src="/img/svg/heart-fill.svg" /> : <img src="/img/svg/heart.svg" />}
                </div>
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          <div>검색결과 없음</div>
        </>
      );
    }
  }
};

export default SearchList;
