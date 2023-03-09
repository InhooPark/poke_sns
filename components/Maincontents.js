import React, { useContext, useEffect } from "react";
import List from "./List";

import { Statusgroup } from "@/context/StatusContext";
import Myprofile from "./Myprofile";
import SearchList from "./SearchList";
import Encyclopedia from "./Encyclopedia";
import Followlist from "./Followlist";
import Edit from "./Update";
import Contenteditor from "./Contenteditor";
import Tutorial from "./Tutorial";
import { InfoUser } from "@/context/infoContext";
import Mylist from "./Mylist";
import Headmeta from "./Headmeta";

const Maincontents = () => {
  const { pageStatus, setPageStatus } = useContext(Statusgroup);
  const { who } = useContext(InfoUser);

  useEffect(() => {
    if (who && who.rep === 0) {
      setPageStatus("NEWBIE");
    }
  }, [who]);

  switch (pageStatus) {
    case "LIST":
      return (
        <>
          <Headmeta title="메인"></Headmeta>
          <List></List>
        </>
      );
    case "FOLLOW":
      return (
        <>
          <Headmeta title="팔로우리스트"></Headmeta>
          <Followlist></Followlist>
        </>
      );
    case "NEWBIE":
      return (
        <>
          <Headmeta title="튜토리얼"></Headmeta>
          <Tutorial></Tutorial>
        </>
      );
    case "MYMSG":
      return (
        <>
          <Headmeta title="작성글"></Headmeta>
          <Mylist></Mylist>
        </>
      );
    case "TREND":
      return <>TREND</>;
    case "WRITE":
      return (
        <>
          <Headmeta title="글작성"></Headmeta>
          <Contenteditor></Contenteditor>
        </>
      );
    case "UPDATE":
      return (
        <>
          <Headmeta title="글수정"></Headmeta>
          <Edit></Edit>
        </>
      );
    case "PROFILE":
      return (
        <>
          <Headmeta title="개인정보"></Headmeta>
          <Myprofile></Myprofile>
        </>
      );
    case "SEARCH":
      return (
        <>
          <Headmeta title="검색결과"></Headmeta>
          <SearchList></SearchList>
        </>
      );
    case "MORE":
      return <>MORE</>;
    case "ENCYCLOPEDIA":
      return (
        <>
          <Headmeta title="도감"></Headmeta>
          <Encyclopedia></Encyclopedia>
        </>
      );
    default:
      return <>올바른 주소를 입력해주세요</>;
  }
};

export default Maincontents;
