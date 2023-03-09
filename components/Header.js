import React, { useContext, useEffect, useState } from "react";
import Style from "@/styles/layout.module.scss";
import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";

const Header = () => {
  const { pageStatus, setPageStatus, setSearchID } = useContext(Statusgroup);
  const [titlename, setTitlename] = useState();

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

  const setTitle = () => {
    switch (pageStatus) {
      case "LIST":
        return "HELLO WORLD";
      case "FOLLOW":
        return "팔로우";
      case "NEWBIE":
        return "튜토리얼";
      case "MYMSG":
        return "작성글";
      case "TREND":
        return "인기글";
      case "WRITE":
        return "글작성";
      case "UPDATE":
        return "글수정";
      case "PROFILE":
        return "개인정보";
      case "SEARCH":
        return "검색결과";
      case "MORE":
        return "더보기";
      case "ENCYCLOPEDIA":
        return "도감";
    }
  };

  useEffect(() => {
    let aa = setTitle();
    setTitlename(aa);
  }, [pageStatus]);

  return (
    <>
      <header className={Style.header}>
        <div className={Style.logo}>
          <div className={Style.logo_btn} onClick={() => setPageStatus("LIST")}>
            <img src="/img/loadimg/pika_dance.webp"></img>
          </div>
        </div>
        <div className={Style.status}>
          {pageStatus !== "LIST" ? (
            <div className={Style.svg_wrap} onClick={() => setPageStatus("LIST")}>
              <svg width="50" height="33" viewBox="0 0 50 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.3862 0L0 16.3862L16.3862 32.7725L20.4462 28.7125L10.9912 19.2575H50V13.515H10.9912L20.4462 4.05995L16.3862 0Z" fill="#E0666688" />
              </svg>
            </div>
          ) : (
            <div className={Style.svg_wrap}></div>
          )}

          <p>{titlename}</p>
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
