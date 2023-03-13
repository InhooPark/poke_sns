import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "@/styles/layout.module.scss";
import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import Headmeta from "./Headmeta";

const Header = () => {
  const { pageStatus, setPageStatus, setSearchID } = useContext(Statusgroup);
  let [title, setTitle] = useState();

  function titleValue() {
    switch (pageStatus) {
      case "LIST":
        return "소식";
      case "FOLLOW":
        return "팔로우리스트";
      case "NEWBIE":
        return "튜토리얼";
      case "MYMSG":
        return "작성글";
      case "TREND":
        return "인기글";
      case "WRITE":
        return "글쓰기";
      case "UPDATET":
        return "글수정";
      case "PROFILE":
        return "개인정보";
      case "SEARCH":
        return "검색결과";
      case "ENCYCLOPEDIA":
        return "도감";
      case "TREND":
        return "인기글";
      default:
        return;
    }
  }

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
  const backBtn = () => {
    setPageStatus("LIST");
  };

  useEffect(() => {
    let aa = titleValue();
    setTitle(aa);
  }, [pageStatus]);

  return (
    <>
      <Headmeta title={title}></Headmeta>
      <header className={Style.header}>
        <div className={Style.logo_btn}>
          <div className={Style.logo_btn_wrap}>
            <img src="/img/loadimg/pika_dance.webp" alt=""></img>
          </div>
        </div>
        <div className={Style.status}>
          {title === "튜토리얼" || title === "소식" ? (
            <div className={Style.margin_dummy}></div>
          ) : (
            <div className={Style.status_arrow_container}>
              <div className={Style.status_arrow_btn} onClick={backBtn}>
                <svg width="50" height="33" viewBox="0 0 50 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.3862 0L0 16.3862L16.3862 32.7725L20.4462 28.7125L10.9912 19.2575H50V13.515H10.9912L20.4462 4.05995L16.3862 0Z" fill="#E06666" />
                </svg>
              </div>
            </div>
          )}
          <div className={Style.status_title}>{title}</div>
        </div>
        <div className={Style.search}>
          <p>
            <input
              onKeyUp={searchSubmit}
              type="text"
              name="search"
              placeholder="User-name / email"
              className={Style.follow_search_bar}
              autoComplete="off"
            ></input>
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
