import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Sign = () => {
  const { status } = useSession();

  const router = useRouter();

  const toSignin = async () => {
    await router.push("/signin");
  };
  const toMain = async () => {
    await router.push("/main");
  };

  if (status === "authenticated") {
    toMain();
  } else if (status === "unauthenticated") {
    toSignin();
  }
};

export default Sign;
