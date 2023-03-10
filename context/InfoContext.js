import React, { createContext, useState } from "react";

export const InfoUser = createContext(null);

const InfoContext = ({ children }) => {
  const [who, setWho] = useState();

  const value = { who, setWho };

  return <InfoUser.Provider value={value}>{children}</InfoUser.Provider>;
};

export default InfoContext;
