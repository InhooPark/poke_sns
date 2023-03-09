import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import { useContext, useState } from "react";

const Edit = () => {
  //데이터 수정 dataUpdate();
  const { setPageStatus, listUpdate } = useContext(Statusgroup);
  const initial = {
    id: listUpdate.id,
    content: listUpdate.content,
  };
  const [inputValue, setValue] = useState(initial);

  //수정 정보 끌어오기
  const valueChange = (e) => {
    e.preventDefault();
    let t = e.target;
    setValue({ ...inputValue, [t.name]: t.value });
  };

  const create = async (e) => {
    e.preventDefault();
    console.log(11);
    await axios.put(`/api/${inputValue.id}`, inputValue);
    setPageStatus("LIST");
  };

  // 한글 70자 영어,숫자 140자
  return (
    <div>
      <form className="inputBox" onSubmit={create}>
        <section className="btn">
          <button onClick={() => setPageStatus("LIST")}>취소</button>
          <button type={"submit"}>완료</button>
        </section>
        <p name={"img"}></p>
        <p name={"name"}></p>
        <p>
          <textarea
            onChange={valueChange}
            value={inputValue.content}
            type="text"
            name="content"
            className="contentBox"
            placeholder="무슨 일이 있었나요?"
            maxLength={140}
          />
        </p>
      </form>
    </div>
  );
};

export default Edit;
