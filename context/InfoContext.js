import React, { createContext, useEffect, useState } from "react";

export const InfoUser = createContext(null);

const InfoContext = ({ children }) => {
  const [who, setWho] = useState();
  const [data, setData] = useState([]);

  const value = { who, setWho, data, setData };

  return <InfoUser.Provider value={value}>{children}</InfoUser.Provider>;
};

export default InfoContext;
