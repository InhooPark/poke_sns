import React, { createContext, useState } from 'react'

export const InfoUser = createContext(null);

const InfoContext = ({children}) => {
  const [who, setWho] = useState();
  const [dummy, setDummy] = useState(false)
  const [data, setData] = useState([]);

  const value = {who, setWho, dummy, setDummy, data, setData};


  
  return (
    <InfoUser.Provider value={value}>
      {children}
    </InfoUser.Provider>
  )
}

export default InfoContext