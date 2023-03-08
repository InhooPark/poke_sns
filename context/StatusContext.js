import React, { createContext, useEffect, useState } from "react";

export const Statusgroup = createContext(null);
const StatusContext = ({ children }) => {
  const [pageStatus, setPageStatus] = useState("LIST");
  const [profileImgToggle, setProfileImgToggle] = useState(false);
  const [profileNameToggle, setProfileNameToggle] = useState(false);
  const [searchID, setSearchID] = useState();
  const [listUpdate, setListUpdate] = useState();

  const value = {
    pageStatus,
    setPageStatus,
    profileImgToggle,
    setProfileImgToggle,
    profileNameToggle,
    setProfileNameToggle,
    searchID,
    setSearchID,
    listUpdate,
    setListUpdate,
  };
  return <Statusgroup.Provider value={value}>{children}</Statusgroup.Provider>;
};

export default StatusContext;
