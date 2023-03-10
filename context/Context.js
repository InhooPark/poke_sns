import React, { createContext, useState } from "react";

export const MyContext = createContext(null);

export default function Context({ children }) {
  const [signnav, setSignnav] = useState(true);

  const value = { signnav, setSignnav };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
