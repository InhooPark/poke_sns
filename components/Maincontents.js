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
import { InfoUser } from "@/context/InfoContext";
import Mylist from "./Mylist";
import Trend from "./Trend";

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
          <List></List>
        </>
      );
    case "FOLLOW":
      return (
        <>
          <Followlist></Followlist>
        </>
      );
    case "NEWBIE":
      return (
        <>
          <Tutorial></Tutorial>
        </>
      );
    case "MYMSG":
      return (
        <>
          <Mylist></Mylist>
        </>
      );
    case "TREND":
      return (
        <>
          <Trend></Trend>
        </>
      );
    case "WRITE":
      return (
        <>
          <Contenteditor></Contenteditor>
        </>
      );
    case "UPDATE":
      return (
        <>
          <Edit></Edit>
        </>
      );
    case "PROFILE":
      return (
        <>
          <Myprofile></Myprofile>
        </>
      );
    case "SEARCH":
      return (
        <>
          <SearchList></SearchList>
        </>
      );
    case "ENCYCLOPEDIA":
      return (
        <>
          <Encyclopedia></Encyclopedia>
        </>
      );
    default:
      return <>올바른 주소를 입력해주세요</>;
  }
};

export default Maincontents;
