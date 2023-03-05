import React, { useContext, useLayoutEffect } from "react";
import List from "./List";

import { Statusgroup } from "@/context/StatusContext";
import Myprofile from "./Myprofile";
import SearchList from "./SearchList";
import Encyclopedia from "./Encyclopedia";

const Maincontents = () => {
  const { pageStatus, setPageStatus } = useContext(Statusgroup);

  switch (pageStatus) {
    case "LIST":
      return (
        <>
          <List></List>
        </>
      );
    case "FOLLOW":
      return <>FOLLOW</>;
    case "MYMSG":
      return <>MYMSG</>;
    case "TREND":
      return <>TREND</>;
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
    case "MORE":
      return <>MORE</>;
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
