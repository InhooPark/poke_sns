import React, { useContext } from "react";
import Header from "./Header";
import Nav from "./Nav";
import Profile from "./Profile";
import Style from "@/styles/layout.module.scss";
import Mnav from "@/components/Mnav";
const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main className={Style.layout_main}>
        <Nav></Nav>
        {children}
        <Mnav />
        <Profile></Profile>
      </main>
    </>
  );
};

export default Layout;
