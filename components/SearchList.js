import { Statusgroup } from "@/context/StatusContext";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Style from "@/styles/maincon.module.scss";

const SearchList = () => {
  const { searchID } = useContext(Statusgroup);

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
