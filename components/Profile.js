import React, { useContext, useEffect, useState } from "react";
import Style from "@/styles/layout.module.scss";
import { useSession, signOut } from "next-auth/react";
import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import { InfoUser } from "@/context/InfoContext";

const Profile = () => {
  const { pageStatus, setPageStatus, pokedata, setPokedata } = useContext(Statusgroup);
  const { who } = useContext(InfoUser);
  const [badges, setBadges] = useState([]);
  const [mylist, setMylist] = useState([]);
  const [badgeModModal, setBadgeModModal] = useState(false);
  const [prekey, setPrekey] = useState();

  const getPoke = () => {
    if (who !== undefined) {
      axios.get("/api/encyclopedia").then((res) => {
        setPokedata(res.data[who.rep - 1]);
      });
    }
  };
  const getMypoke = () => {
    if (who !== undefined && pageStatus !== "NEWBIE") {
      axios.put("/api/encyclopedia", { id: who.id }).then((res) => {
        if (res.data !== null) {
          if (res.data.poke_id !== null) {
            let arr = res.data.poke_id.split(",");
            arr.sort((a, b) => {
              return a - b;
            });
            setMylist(arr);
          }
        } else {
          return;
        }
      });
    }
  };

  const profileBtnClick = () => {
    if (pageStatus !== "NEWBIE") setPageStatus("PROFILE");
  };
  const followBtnClick = () => {
    if (pageStatus !== "NEWBIE") setPageStatus("FOLLOW");
  };
  const BadgeFunc = (key) => {
    if (prekey !== key) {
      setPrekey(key);
      setBadgeModModal(true);
    } else {
      setBadgeModModal(false);
      setPrekey("");
    }
  };
  const selectBadge = (key) => {
    setBadgeModModal(false);
    badges[prekey] = key;
    // 이걸 서버로 전송해야함
    axios.put("/api/auth/who", {
      id: who.id,
      data: badges,
    });
  };

  useEffect(() => {
    if (pageStatus !== "NEWBIE") {
      getMypoke();
      getPoke();
      if (who !== undefined) {
        setBadges(who.badge_list.split(","));
      }
    }
  }, [who]);
  if (who !== undefined) {
    return (
      <>
        <aside className={Style.profile_container}>
          <div className={Style.profile_wrapper}>
            <div className={Style.profile_wrap}>
              <div className={Style.profile_user_wrap}>
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
                </div>
              </div>

              <div className={Style.profile_badge_wrap}>
                {badges &&
                  badges.map((badge, key) => {
                    return badge === "" ? (
                      <div key={key} className={Style.profile_badge_img_wrap} onClick={() => BadgeFunc(key)}>
                        <img className={Style.profile_badge_img_empty} src="/img/poke-face-silueta.png" alt="emptybadge"></img>
                      </div>
                    ) : (
                      <div key={key} className={Style.profile_badge_img_wrap} onClick={() => BadgeFunc(key)}>
                        <img
                          src="/img/poke-face.png"
                          alt="pokebadge"
                          style={{
                            transform: `translateX(calc(-${100 * ((badge % 12 === 0 ? 12 : badge % 12) - 1)}% / 12)) translateY(calc(-${
                              100 * (Math.ceil(badge / 12) - 1)
                            }% / 13))`,
                          }}
                        ></img>
                      </div>
                    );
                  })}
                <div className={badgeModModal ? `${Style.profile_badge_modal} ${Style.on}` : Style.profile_badge_modal}>
                  {mylist.map((list, key) => {
                    return (
                      <div key={key} className={Style.modal_img_wrap} onClick={() => selectBadge(list)}>
                        <img
                          src="/img/poke-face.png"
                          alt="modal image"
                          style={{
                            transform: `translateX(calc(-${100 * ((list % 12 === 0 ? 12 : list % 12) - 1)}% / 12)) translateY(calc(-${
                              100 * (Math.ceil(list / 12) - 1)
                            }% / 13))`,
                          }}
                        />
                      </div>
                    );
                  })}
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
