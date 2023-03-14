import Headmeta from "@/components/Headmeta";
import Signnav from "@/components/Signnav";
import React, { useContext, useRef, useState } from "react";
import Style from "@/styles/sign.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { MyContext } from "@/context/Context";

const Signup = () => {
  const [formStatus, setFormStatus] = useState();
  const [data, setData] = useState();
  const { signnav, setSignnav } = useContext(MyContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { status } = useSession();

  async function createUser(emailref, passwordref) {
    await axios.post("/api/auth/signup", { email: emailref, password: passwordref }).then((res) => {
      setData(res.data);
    });
    return data;
  }

  async function submitHandler(e) {
    e.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    try {
      const result = await createUser(enteredEmail, enteredPassword);
      location.replace("/signin");
      setSignnav(true);
    } catch (error) {
      setFormStatus(`Error Occured: ${error.message}`);
    }
  }

  if (status === "authenticated") {
    location.replace("/");
  }
  return (
    <>
      <Signnav></Signnav>
      <Headmeta title="Sign up"></Headmeta>
      <main className={Style.sign_main}>
        <div className={Style.sign_form_box}>
          <p> Sign up </p>
          <form onSubmit={submitHandler}>
            <p>
              <input ref={emailInputRef} type="email" placeholder="email" name="email" autoComplete="none"></input>
            </p>
            <p>
              <input ref={passwordInputRef} type="password" placeholder="password" name="password"></input>
            </p>
            <span>{formStatus}</span>
            <p>
              <input type="submit" value="Sign up"></input>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signup;
