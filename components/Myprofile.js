import { Statusgroup } from "@/context/StatusContext";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Style from "@/styles/maincon.module.scss";
import { useSession } from "next-auth/react";
import axios from "axios";
import { MyContext } from "@/context/context";

const Myprofile = () => {
  const { data: session } = useSession();
  const [profileImgArr, setProfileImgArr] = useState();
  const { profileImgToggle, setProfileImgToggle, profileNameToggle, setProfileNameToggle } = useContext(Statusgroup);
  const whoseId = session.user.id;
  const [who, setWho] = useState();
  const [save, setSave] = useState();

  const getWho = async () => {
    axios
      .get("/api/auth/who", {
        params: {
          id: whoseId,
        },
      })
      .then((res) => {
        setWho(res.data);
        setSave(res.data);
      });
  };

  // 회원 탈퇴
  // 대표 포켓몬 변경
  // 뱃지 리스트?

  useLayoutEffect(() => {
    let arr = [];
    for (let i = 1; i <= 28; i++) {
      arr.push(`pokballpixel-${("00" + i).slice(-3)}.png`);
    }
    setProfileImgArr(arr);
  }, []);

  const profileImgMod = () => {
    setProfileImgToggle(!profileImgToggle);
  };
  const profileNameMod = () => {
    setProfileNameToggle(!profileNameToggle);
  };
  const profileImgModSelect = (key) => {
    let t = ("00" + (key + 1)).slice(-3);
    setWho({ ...who, pro_img: t });
    setSave({ ...save, pro_img: t });
    setProfileImgToggle(false);
  };
  const profileNameModSelect = (e) => {
    e.preventDefault();
    if (e.target.name.value === "") {
      setProfileNameToggle(false);
    } else {
      setWho({ ...who, name: e.target.name.value });
      setSave({ ...save, name: e.target.name.value });
      e.target.name.value = "";
      setProfileNameToggle(false);
    }
  };
  const dataMod = () => {
    // 정말 변경하시겠습니까 경고창 띄우는것도 좋을듯
    axios.put("api/auth/signup", { id: save.id, pro_img: save.pro_img, name: save.name });
    location.reload();
  };

  useEffect(() => {
    getWho();
  }, []);

  if (who !== undefined) {
    return (
      <>
        <div className={Style.myprofile}>
          <div className={Style.profile_img_wrap}>
            <img src={`/img/poke_profile_img/pokballpixel-${who.pro_img}.png`}></img>
            <div className={Style.profile_img_mod} onClick={profileImgMod}>
              <img src="/img/svg/pencil.svg"></img>
            </div>

            <div className={profileImgToggle ? `${Style.img_toggle} ${Style.on}` : `${Style.img_toggle}`}>
              <div className={Style.img_mod_toggle_exit} onClick={() => setProfileImgToggle(false)}>
                <img src="/img/svg/cancel.svg"></img>
              </div>
              <div className={Style.img_mod_list}>
                {profileImgArr &&
                  profileImgArr.map((img, k) => {
                    return (
                      <div key={k} className={Style.img_mod_img_wrap} onClick={() => profileImgModSelect(k)}>
                        <img src={`/img/poke_profile_img/${img}`}></img>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={Style.profile_info_wrap}>
            <div className={Style.profile_info_name}>
              {who.name}
              <div className={Style.profile_name_mod} onClick={profileNameMod}>
                <img src="/img/svg/pencil.svg"></img>
              </div>
            </div>
            <div className={Style.profile_info_email}>{who.email}</div>

            <div className={profileNameToggle ? `${Style.profile_name_mod_toggle} ${Style.on}` : `${Style.profile_name_mod_toggle}`}>
              <form onSubmit={profileNameModSelect}>
                <p>
                  <input type="text" name="name" placeholder="변경할 이름" autoComplete="off"></input>
                </p>
                <p>
                  <input type="submit" value="변경"></input>
                </p>
              </form>
            </div>
          </div>
          <button onClick={dataMod}>변경</button>
        </div>
      </>
    );
  }
};

export default Myprofile;
