import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "@/styles/maincon.module.scss";
import { useSession } from "next-auth/react";
import { InfoUser } from "@/context/InfoContext";
import Chart from "./Chart";

const Encyclopedia = () => {
  const [pokeData, setPokeData] = useState();
  const { data: session } = useSession();
  //보유중인 포켓몬이
  const [userHave, setUserHave] = useState();
  //팝업창
  const [modalstate, setModalState] = useState(false);
  //who(유저 정보: who.id, who.credit, who.rep(대표이미지))
  const { who } = useContext(InfoUser);
  const currentKey = useRef(0);
  //포켓몬 id+1값
  const poke_key = useRef(0);
  const [status, setStatus] = useState(false);
  //포켓몬 크레딧 - 가지고 있는 크레딧
  const [haveCredit, setHaveCredit] = useState(0);

  //보유중인 포켓몬(테이블명 : have_poke)에 id+poke_id  가져오기
  const havePokeGet = () => {
    axios.put("/api/encyclopedia", { id: who.id }).then((res) => {
      //보유중인 poke_id
      if (res.data.poke_id !== undefined) {
        let aa = res.data.poke_id;
        //배열로 쪼개기
        let arr = aa.split(",");
        setUserHave(arr);
      }
    });
  };
  const getEncyclopedia = async () => {
    await axios.get("/api/encyclopedia").then((res) => {
      setPokeData(res.data);
    });
  };
  // pokemon 값에 따라 특정 캐릭터 구매 / 디테일 확인
  //pokemon.(id,credit, ko_name)
  const pokeBuy = (pokemon) => {
    currentKey.current = pokemon;
    setHaveCredit(who.credit - currentKey.current.credit);
    if (userHave.includes(pokemon.id.toString())) {
      alert("이미 보유중인 포켓몬 입니다");
    } else {
      //팝업창 생성 후 구매하시겠습니까
      setModalState(!modalstate);
    }
  };
  //팝업창 yes,no
  const no = () => {
    setModalState(!modalstate);
  };
  const yes = () => {
    if (who.credit < currentKey.current.credit) {
      alert("구매하실 수 없습니다");
    } else {
      //배열에 선택한 poke_id에 push
      userHave.push(currentKey.current.id.toString());
      //aa를 배열로 만들어서 구매한 포켓몬 추가
      let aa;
      userHave.map((id, key) => {
        if (key == 0) {
          aa = id;
        } else {
          aa += "," + id;
        }
      });
      axios.post("/api/encyclopedia", { id: session.user.id, data: aa });
      //크레딧 관리
      let data = who.credit - currentKey.current.credit;
      axios.put("/api/userencyl", { id: session.user.id, data: data });
      location.reload();
    }
  };
  //모달창 닫기
  const modalClick = (e) => {
    if (e.target.id === "aa") {
      setModalState(!modalstate);
    }
  };
  const modalClick2 = (e) => {
    if (e.target.id === "aa") {
      setStatus(!status);
    }
  };

  const pokeDetail = (key) => {
    let data = key;
    poke_key.current = key;
    //user_table에 rep(대표 몬스터)
    // 디테일 부분은 속성 출력 / 추가로 chart.js - Radar Chart  이용해서 그래프 그려보기
    // 참고 : https://www.chartjs.org/docs/latest/charts/radar.html
    // 여기서 대표 캐릭터 설정하는게 좋을듯 대표포켓몬은 /api/auth/signup/ 으로 보내야함
    if (!userHave.includes(data.toString())) {
      alert("구매 먼저 해주세요");
    } else {
      setStatus(!status);
    }
  };
  const changeRep = () => {
    //poke_key (클릭한 포켓몬의 고유 번호)
    axios.put(`/api/auth/signup/`, { id: session.user.id, key: poke_key.current });
    location.reload();
  };

  useEffect(() => {
    getEncyclopedia();
    havePokeGet();
  }, [who]);
  if (userHave !== undefined) {
    return (
      <>
        <article className={Style.encyclopedia_container}>
          {pokeData &&
            pokeData.map((pokemon, key) => {
              return (
                <figure className={userHave.includes(pokemon.id.toString()) ? `${Style.poke_card}` : `${Style.poke_card} ${Style.have}`} key={pokemon.id}>
                  <div className={Style.card_img_wrap}>
                    <img src={pokemon.card_url} alt=""></img>
                  </div>
                  <figcaption className={Style.card_info_wrap}>
                    <p>
                      No.{pokemon.id} &nbsp;
                      {pokemon.ko_name}
                    </p>
                    <div className={Style.info_btn_wrap}>
                      {userHave.includes(pokemon.id.toString()) ? (
                        <button onClick={() => pokeBuy(pokemon)} disabled>
                          구매하기
                        </button>
                      ) : (
                        <button onClick={() => pokeBuy(pokemon)}>구매하기</button>
                      )}
                      <button onClick={() => pokeDetail(key + 1)}>상세정보</button>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          <div className={modalstate ? `${Style.sticky_tray} ${Style.on}` : Style.sticky_tray}>
            <div id="aa" className={Style.encyclopedia_modal} onClick={(e) => modalClick(e)}>
              <div className={Style.modal_wrap}>
                <div className={Style.modal_wrap_first}>
                  <p>{currentKey.current && currentKey.current.ko_name}</p>
                  <p>{currentKey.current && currentKey.current.credit} 크레딧</p>
                </div>
                <div className={Style.modal_wrap_second}>
                  <p>
                    <img src={`${currentKey.current && pokeData[currentKey.current.id - 1].card_url}`} alt="사진" />
                  </p>
                  <div className={Style.modal_detail_wrap}>
                    <div>
                      <p>{"보유중 크레딧: "}</p>
                      <p>{"차감 크레딧: "}</p>
                      <p>{"TOTAL 크레딧: "}</p>
                    </div>
                    <div>
                      <p>{who && who.credit}</p>
                      <p>{currentKey.current && currentKey.current.credit}</p>
                      <p>{haveCredit && haveCredit}</p>
                    </div>
                  </div>
                </div>
                <div className={Style.modal_wrap_third}>
                  <p>구매하시겠습니까?</p>
                  <div className={Style.btn}>
                    <button onClick={yes}>예</button>
                    <button onClick={no}>아니오</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={status ? `${Style.sticky_tray}  ${Style.on}` : `${Style.sticky_tray}`}>
            <div id="aa" className={Style.encyclopedia_modal} onClick={(e) => modalClick2(e)}>
              <div className={Style.pickup}>
                <div>
                  <Chart num={poke_key.current}></Chart>
                </div>
                <button onClick={() => changeRep()}>
                  <p>대표캐릭터 설정</p>
                </button>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  } else {
    return (
      <div className={Style.encyclopedia_load}>
        <img src="/img/loadimg/pika_heart.webp" alt=""></img>
      </div>
    );
  }
};

export default Encyclopedia;
