import React, { useContext, useState } from "react";
import Style from "@/styles/layout.module.scss";
import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";

const Header = () => {
  const { pageStatus, setPageStatus, setSearchID } = useContext(Statusgroup);

  const searchSubmit = async (e) => {
    if (e.keyCode === 13) {
      if (e.target.value !== "") {
        if (e.target.value.length < 3) {
          alert("3글자 이상 입력해주세요");
        } else {
          try {
            await axios.put("/api/search", { value: e.target.value }).then((res) => {
              setSearchID(res.data);
              setPageStatus("SEARCH");
            });
          } catch (err) {
            console.log(err);
          }
        }
        e.target.value = "";
      }
    }
  };

  return (
    <>
      <header className={Style.header}>
        <div className={Style.logo_btn}> LOGO </div>
        <div className={Style.status}> 
          {pageStatus}
        <div className={Style.listBtn}>
          <button className={Style.all}>timeline</button>
          <button className={Style.follow}>follow</button>
        </div>
        </div>
        <div className={Style.search}>
          <p>
            <input onKeyUp={searchSubmit} type="text" name="search" placeholder="User-name / email" className={Style.follow_search_bar}></input>
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
