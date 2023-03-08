import { signOut, useSession } from "next-auth/react";
import React, { useContext } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Maincontents from "@/components/Maincontents";
import Style from "@/styles/layout.module.scss";

const Main = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
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
