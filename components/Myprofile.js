import { Statusgroup } from "@/context/StatusContext";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Style from "@/styles/maincon.module.scss";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { InfoUser } from "@/context/InfoContext";

const Myprofile = () => {
  const { data: session } = useSession();
  const [profileImgArr, setProfileImgArr] = useState();
  const { profileImgToggle, setProfileImgToggle, profileNameToggle, setProfileNameToggle } = useContext(Statusgroup);
  const whoseId = session.user.id;
  const { who } = useContext(InfoUser);
  const [save, setSave] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const getWho = () => {
    setSave(who);
  };

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
    setSave({ ...save, pro_img: t });
    setProfileImgToggle(false);
  };
  const profileNameModSelect = (e) => {
    e.preventDefault();
    if (e.target.name.value === "") {
      setProfileNameToggle(false);
    } else {
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
  const dataDel = () => {
    setDeleteModal(true);
  };
  const modalCancelBtn = () => {
    setDeleteModal(false);
  };
  const trueDelete = async () => {
    signOut();
    await axios.delete("api/auth/signup", { data: whoseId });
  };
  const modmodaloff = () => {
    setProfileNameToggle(false);
  };

  useEffect(() => {
    getWho();
  }, [who]);

  if (save !== undefined) {
    return (
      <>
        <div className={Style.myprofile}>
          <div className={Style.profile_img_wrap}>
            <img src={`/img/poke_profile_img/pokballpixel-${save && save.pro_img}.png`} alt=""></img>
            <div className={Style.profile_img_mod} onClick={profileImgMod}>
              <img src="/img/svg/pencil.svg" alt=""></img>
            </div>

            <div className={profileImgToggle ? `${Style.img_toggle} ${Style.on}` : `${Style.img_toggle}`}>
              <div className={Style.img_mod_toggle_exit} onClick={() => setProfileImgToggle(false)}>
                <img src="/img/svg/cancel.svg" alt=""></img>
              </div>
              <div className={Style.img_mod_list}>
                {profileImgArr &&
                  profileImgArr.map((img, k) => {
                    return (
                      <div key={k} className={Style.img_mod_img_wrap} onClick={() => profileImgModSelect(k)}>
                        <img src={`/img/poke_profile_img/${img}`} alt=""></img>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={Style.profile_info_wrap}>
            <div className={Style.profile_info_name}>
              {save && save.name}
              <div className={Style.profile_name_mod} onClick={profileNameMod}>
                <img src="/img/svg/pencil.svg" alt=""></img>
              </div>
            </div>
            <div className={Style.profile_info_email}>{save.email}</div>

            <div className={profileNameToggle ? `${Style.profile_name_mod_toggle} ${Style.on}` : `${Style.profile_name_mod_toggle}`}>
              <form onSubmit={profileNameModSelect}>
                <p>
                  <input type="text" name="name" placeholder="변경할 이름" autoComplete="off"></input>
                </p>
                <p>
                  <input type="submit" value="변경"></input>
                  <input type="button" value="취소" onClick={modmodaloff}></input>
                </p>
              </form>
            </div>
          </div>
          <div className={Style.profile_last_btn_wrap}>
            <button onClick={dataMod}>변경</button>
            <button onClick={dataDel}>삭제</button>
            <div className={deleteModal ? `${Style.delete_modal} ${Style.on}` : `${Style.delete_modal}`}>
              <div className={Style.delete_modal_contents}>
                <p> 정말 삭제하시겠습니까? </p>
                <div className={Style.delete_modal_btn_wrap}>
                  <button onClick={trueDelete}>삭제</button>
                  <button onClick={modalCancelBtn}>취소</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    <div className={Style.myprofile_load}>
      <img src="/img/loadimg/pika_heart.webp" alt=""></img>
    </div>;
  }
};

export default Myprofile;
