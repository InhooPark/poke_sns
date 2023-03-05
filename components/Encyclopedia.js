import axios from "axios";
import React, { useEffect, useState } from "react";
import Style from "@/styles/maincon.module.scss";

const Encyclopedia = () => {
  const [pokeData, setPokeData] = useState();

  const getEncyclopedia = () => {
    axios.get("/api/encyclopedia").then((res) => {
      setPokeData(res.data);
    });
  };

  // key 값에 따라 특정 캐릭터 구매 / 디테일 확인
  const pokeBuy = (key) => {
    console.log(key);
  };
  const pokeDetail = (key) => {
    // 디테일 부분은 속성 출력 / 추가로 chart.js - Radar Chart  이용해서 그래프 그려보기
    // 참고 : https://www.chartjs.org/docs/latest/charts/radar.html
    // 여기서 대표 캐릭터 설정하는게 좋을듯 대표포켓몬은 /api/auth/signup/ 으로 보내야함
    console.log(key);
  };
  //////////////////////

  useEffect(() => {
    getEncyclopedia();
  }, []);

  if (pokeData !== undefined) {
    return (
      <article className={Style.encyclopedia_container}>
        {pokeData.map((pokemon, key) => {
          return (
            <figure className={Style.poke_card} key={pokemon.id}>
              <div className={Style.card_img_wrap}>
                <img src={pokemon.card_url}></img>
              </div>
              <figcaption className={Style.card_info_wrap}>
                <p>
                  No.{pokemon.id} &nbsp;
                  {pokemon.ko_name}
                </p>
                <div className={Style.info_btn_wrap}>
                  {/* 보유한 포켓몬일 경우 구매하기 버튼을 disable 시켜도 좋을듯 */}
                  <button onClick={() => pokeBuy(key)}>구매하기</button>
                  <button onClick={() => pokeDetail(key)}>상세정보</button>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </article>
    );
  }
};

export default Encyclopedia;
