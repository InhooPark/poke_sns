import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "@/styles/layout.module.scss";
import { useSession, signOut } from "next-auth/react";
import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";

const Profile = () => {
  const { data: session, status } = useSession();
  const { pageStatus, setPageStatus } = useContext(Statusgroup);
  const whoseId = session.user.id;
  const [who, setWho] = useState();

  const getWho = async () => {
    axios
      .get("/api/auth/who", {
        params: {
          id: whoseId,
        },
      })
      .then((res) => {
        setWho(res.data);
      });
  };

  useEffect(() => {
    getWho();
  }, []);

  const profileBtnClick = () => {
    setPageStatus("PROFILE");
  };
  const followBtnClick = () => {
    setPageStatus("FOLLOW");
  };
  const mymsgBtnClick = () => {
    setPageStatus("MYMSG");
  };

  if (who !== undefined) {
    return (
      <>
        <aside className={Style.profile_container}>
          <div className={Style.profile_wrapper}>
            <div className={Style.profile_wrap}>
              <div className={Style.profile_img_wrap}>{<img src={`/img/poke_profile_img/pokballpixel-${who.pro_img}.png`}></img>}</div>
              <div className={Style.profile_info_wrap}>
                <div className={Style.profile_name}>{who.name == "" ? "너의 이름은..." : who.name}</div>
                <div className={Style.profile_email}>
                  <div>
                    <b>@&nbsp;</b>
                    <small>{who.email}</small>
                  </div>
                  <div>
                    <div className={Style.coin_img_wrap}>
                      <img src="/img/poke_coin_pixel.png"></img>
                    </div>
                    <span>{who.credit}</span>
                  </div>
                </div>
                <div className={Style.profile_badge}>
                  {/* dummy */}
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </div>
            <div className={Style.profile_menu_wrap}>
              <p onClick={profileBtnClick}>프로필 수정</p>
              <p onClick={followBtnClick}>팔로우</p>
              <p onClick={mymsgBtnClick}>작성글</p>
              <p onClick={() => signOut()}>로그아웃</p>
            </div>
          </div>
          <div className={Style.rep_wrap}>
            {/* 처음 계정일때는 비워놔야함 비어있는 이미지도 구하면 좋을듯? ?모양이라던가 */}
            {who.rep == 0 ? <img src="/img/poke_silueta.png"></img> : <img src={`https://www.shinyhunters.com/images/regular/${who.rep}.gif`}></img>}
          </div>
        </aside>
      </>
    );
  }
};

export default Profile;
