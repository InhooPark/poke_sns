import { Statusgroup } from "@/context/StatusContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "@/styles/maincon.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";

const SearchList = () => {
  const { searchID } = useContext(Statusgroup);
  const { data: session } = useSession();
  const [followlist, setFollowlist] = useState();
  const [followModal, setFollowModal] = useState(false);
  const [followCancel, setFollowCancel] = useState();
  const followTarget = useRef();

  const favoriteUser = (user) => {
    followTarget.current = user.id;
    setFollowModal(true);
    if (followlist.find((fav) => fav == user.id)) {
      setFollowCancel(false);
    } else {
      setFollowCancel(true);
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
        setFollowlist(res.data.follow_list.split(","));
      });
  };

  const followBtn = () => {
    let aa = "";
    followlist.map((list, key) => {
      if (key === 0) {
        return;
      } else {
        aa += "," + list;
      }
    });

    if (followCancel) {
      axios.post("/api/follow", { type: "follow", id: session.user.id, follow_list: aa, user_id: followTarget.current });
      setFollowModal(false);
      location.reload();
    } else {
      axios.post("/api/follow", { type: "unfollow", id: session.user.id, follow_list: aa, user_id: followTarget.current });
      setFollowModal(false);
      location.reload();
    }
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
                <div className={Style.user_list_follow} onClick={() => favoriteUser(user)}>
                  {followlist && followlist.find((fav) => fav == user.id) ? <img src="/img/svg/heart-fill.svg" /> : <img src="/img/svg/heart.svg" />}
                </div>
              </div>
            );
          })}
          <div className={followModal ? `${Style.follow_modal} ${Style.on}` : `${Style.follow_modal}`}>
            {followCancel ? <p>팔로우 하시겠습니까?</p> : <p>팔로우를 취소 하시겠습니까?</p>}
            <div className={Style.follow_modal_btn_wrap}>
              <button onClick={followBtn}>Yes</button>
              <button onClick={() => setFollowModal(false)}>No</button>
            </div>
          </div>
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
