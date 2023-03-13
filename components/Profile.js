import React, { useContext, useEffect, useState } from "react";
import Style from "@/styles/layout.module.scss";
import { useSession, signOut } from "next-auth/react";
import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import { InfoUser } from "@/context/InfoContext";

const Profile = () => {
  const { data: session } = useSession();
  const { setPageStatus, data, pokedata, setPokedata } = useContext(Statusgroup);
  const { who, setWho } = useContext(InfoUser);
  const whoseId = session.user.id;

  const getPoke = () => {
    if (who !== undefined) {
      axios.get("/api/encyclopedia").then((res) => {
        setPokedata(res.data[who.rep - 1]);
      });
    }
  };
  const getWho = () => {
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
  }, [data]);
  useEffect(() => {
    getPoke();
  }, [who]);

  const profileBtnClick = () => {
    setPageStatus("PROFILE");
  };
  const followBtnClick = () => {
    setPageStatus("FOLLOW");
  };

  if (who !== undefined) {
    return (
      <>
        <aside className={Style.profile_container}>
          <div className={Style.profile_wrapper}>
            <div className={Style.profile_wrap}>
              <div className={Style.profile_img_wrap}>{<img src={`/img/poke_profile_img/pokballpixel-${who.pro_img}.png`} alt=""></img>}</div>
              <div className={Style.profile_info_wrap}>
                <div className={Style.profile_name}>{who.name == "" ? "너의 이름은..." : who.name}</div>
                <div className={Style.profile_email}>
                  <div>
                    <b>&nbsp;</b>
                    <small>{who.email}</small>
                  </div>
                  <div>
                    <div className={Style.coin_img_wrap}>
                      <img src="/img/poke_coin_pixel.png" alt=""></img>
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
              <p onClick={() => signOut()}>로그아웃</p>
            </div>
          </div>
          <div className={Style.rep_wrap}>
            <div className={Style.rep_ring}></div>
            {who.rep == 0 ? <img src="/img/poke_silueta.png" alt=""></img> : <img src={pokedata && pokedata.motion_url} alt=""></img>}
          </div>
        </aside>
      </>
    );
  }
};

export default Profile;
