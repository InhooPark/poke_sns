import { MyContext } from "@/context/Context";
import React, { useContext } from "react";
import Style from "@/styles/sign.module.scss";
import { useRouter } from "next/router";

const Signnav = () => {
  const { signnav, setSignnav } = useContext(MyContext);
  const router = useRouter();

  const signnavFunc = () => {
    setSignnav(!signnav);
    if (signnav) {
      router.push("/signup");
    } else {
      router.push("/signin");
    }
  };

  return (
    <nav className={Style.sign_nav}>
      <button onClick={signnavFunc} className={signnav ? Style.on : ""}>
        Sign up
      </button>
      <button onClick={signnavFunc} className={signnav ? "" : Style.on}>
        Sign in
      </button>
    </nav>
  );
};

export default Signnav;
