import { Statusgroup } from "@/context/StatusContext";
import React, { useContext, useRef, useState } from "react";
import Style from "@/styles/maincon.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";
import { InfoUser } from "@/context/InfoContext";

const SearchList = () => {
  const { searchID } = useContext(Statusgroup);
  const { myfollowlist } = useContext(InfoUser);
  const { data: session } = useSession();
  const [followModal, setFollowModal] = useState(false);
  const [followCancel, setFollowCancel] = useState();
  const followTarget = useRef();

  const favoriteUser = (id) => {
    followTarget.current = id;
    setFollowModal(true);
    if (myfollowlist.find((fav) => fav == id)) {
      setFollowCancel(false);
    } else {
      setFollowCancel(true);
    }
  };

  const followBtn = () => {
    if (followCancel) {
      myfollowlist.push(followTarget.current);
      axios.put("/api/follow", { id: session.user.id, data: myfollowlist });
      setFollowModal(false);
      location.reload();
    } else {
      let aa = myfollowlist.filter((id) => id != followTarget.current);
      axios.put("/api/follow", { id: session.user.id, data: aa });
      setFollowModal(false);
      location.reload();
    }
  };

  if (searchID !== undefined) {
    if (searchID.length) {
      return (
        <>
          {searchID.map((user) => {
            return (
              <div key={user.id} className={Style.user_list}>
                <div className={Style.user_list_pro_img}>
                  <img src={`/img/poke_profile_img/pokballpixel-${user.pro_img}.png`} alt=""></img>
                </div>
                <div className={Style.user_list_info}>
                  <p className={Style.user_list_name}>{user.name === "" ? "설정된 이름이 없습니다." : user.name}</p>
                  <p className={Style.user_list_email}>@{user.email}</p>
                </div>
                <div className={Style.user_list_follow} onClick={() => favoriteUser(user.id)}>
                  {myfollowlist && myfollowlist.find((fav) => fav == user.id) ? (
                    <img src="/img/svg/heart-fill.svg" alt="" />
                  ) : (
                    <img src="/img/svg/heart.svg" alt="" />
                  )}
                </div>
              </div>
            );
          })}
          <div className={followModal ? `${Style.follow_modal_wrap} ${Style.on}` : Style.follow_modal_wrap}>
            <div className={Style.follow_modal}>
              {followCancel ? <p>팔로우 하시겠습니까?</p> : <p>팔로우를 취소 하시겠습니까?</p>}
              <div className={Style.follow_modal_btn_wrap}>
                <button onClick={followBtn}>Yes</button>
                <button onClick={() => setFollowModal(false)}>No</button>
              </div>
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
