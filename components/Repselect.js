import React from "react";
import Style from "@/styles/maincon.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";

const Repselect = () => {
  const { data: session } = useSession();
  const repsel = (key) => {
    axios.put("/api/auth/signup", { type: "newbie", id: session.user.id, key: key });
    location.replace("/main");
  };
  return (
    <>
      <article className={Style.repsel}>
        <p>스타팅 포켓몬을 선택해주세요</p>

        <div className={Style.repsel_wrap}>
          <figure className={Style.repsel_img_wrap} onClick={() => repsel(1)}>
            <img src="https://data1.pokemonkorea.co.kr/newdata/pokedex/full/000101.png"></img>
            <figcaption>이상해씨</figcaption>
          </figure>
          <figure className={Style.repsel_img_wrap} onClick={() => repsel(4)}>
            <img src="https://data1.pokemonkorea.co.kr/newdata/pokedex/full/000401.png"></img>
            <figcaption>파이리</figcaption>
          </figure>
          <figure className={Style.repsel_img_wrap} onClick={() => repsel(7)}>
            <img src="https://data1.pokemonkorea.co.kr/newdata/pokedex/full/000701.png"></img>
            <figcaption>꼬부기</figcaption>
          </figure>
        </div>
      </article>
    </>
  );
};

export default Repselect;
