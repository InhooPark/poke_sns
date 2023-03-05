import Headmeta from "@/components/Headmeta";
import Sign from "@/components/Sign";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Headmeta title="index"></Headmeta>
      <Sign></Sign>
    </>
  );
}
