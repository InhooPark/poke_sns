import React, { createContext, useState } from "react";

export const Statusgroup = createContext(null);
const StatusContext = ({ children }) => {
  const [pageStatus, setPageStatus] = useState("LIST");
  const [profileImgToggle, setProfileImgToggle] = useState(false);
  const [profileNameToggle, setProfileNameToggle] = useState(false);
  const [searchID, setSearchID] = useState();
  const [listUpdate, setListUpdate] = useState();
  const [tutostate, setTutostate] = useState(1);
  const [contentlist, setContentlist] = useState(true);
  const [data, setData] = useState([]);
  const [arr, setArr] = useState();
  const [result, setResult] = useState([]);
  const [pokedata, setPokedata] = useState();

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
    tutostate,
    setTutostate,
    contentlist,
    setContentlist,
    data,
    setData,
    arr,
    setArr,
    result,
    setResult,
    pokedata,
    setPokedata,
  };
  return <Statusgroup.Provider value={value}>{children}</Statusgroup.Provider>;
};

export default StatusContext;
