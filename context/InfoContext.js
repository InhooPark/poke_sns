import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Statusgroup } from "./StatusContext";

export const InfoUser = createContext(null);

const InfoContext = ({ children }) => {
  const { data, setData } = useContext(Statusgroup);

  const [who, setWho] = useState();
  const [myfollowlist, setMyfollowlist] = useState();

  const { data: session, status } = useSession();

  const getFollowlist = () => {
    axios
      .get("/api/follow", {
        params: {
          id: session.user.id,
        },
      })
      .then((res) => {
        if (res.data.follow_list !== "") {
          setMyfollowlist(res.data.follow_list.split(","));
        } else {
          setMyfollowlist([]);
        }
      });
  };
  const getWho = () => {
    axios
      .get("/api/auth/who", {
        params: {
          id: session.user.id,
        },
      })
      .then((res) => {
        setWho(res.data);
      });
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (session !== undefined) {
        getWho();
      }
    }
  }, [session, data]);

  useEffect(() => {
    if (status === "authenticated") {
      if (session !== undefined) {
        getFollowlist();
      }
    }
  }, [session]);

  const value = { who, setWho, myfollowlist, setMyfollowlist };

  return <InfoUser.Provider value={value}>{children}</InfoUser.Provider>;
};

export default InfoContext;
