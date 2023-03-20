import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Sign = () => {
  const { status } = useSession();

  const router = useRouter();

  const toSignin = async () => {
    router.push("/signin");
  };
  const toMain = async () => {
    router.push("/main");
  };

  if (status === "authenticated") {
    toMain();
  } else if (status === "unauthenticated") {
    toSignin();
  }
};

export default Sign;
