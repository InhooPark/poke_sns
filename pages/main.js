import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";
import Layout from "@/components/Layout";
import Maincontents from "@/components/Maincontents";
import Style from "@/styles/layout.module.scss";
import { Statusgroup } from "@/context/StatusContext";

const Main = () => {
  const { data: session, status } = useSession();
  // const { setPageStatus } = useContext(Statusgroup);

  // useEffect(() => {
  //   setPageStatus("LIST");
  // }, []);
  if (status === "unauthenticated") {
    location.replace("/");
  } else if (status === "authenticated") {
    return (
      <Layout>
        <div className={Style.main_content_inner}>
          <Maincontents></Maincontents>
        </div>
      </Layout>
    );
  }
};

export default Main;
