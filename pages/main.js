import { signOut, useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Maincontents from "@/components/Maincontents";
import Style from "@/styles/layout.module.scss";
import { Statusgroup } from "@/context/StatusContext";

const Main = () => {
  const { data: session, status } = useSession();
  const { setPageStatus } = useContext(Statusgroup);
  const router = useRouter();

  useEffect(() => {
    setPageStatus("LIST");
  }, []);

  if (status === "unauthenticated") {
    router.replace("/");
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
