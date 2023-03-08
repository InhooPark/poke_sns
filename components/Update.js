import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const Edit = () => {
  //데이터 수정 dataUpdate();
  const { setPageStatus, listUpdate } = useContext(Statusgroup);
  const router = useRouter();
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

  const create = (e) => {
    e.preventDefault();
    console.log(inputValue);
    axios.put(`/api/${inputValue.id}`, inputValue);
    setPageStatus("LIST");
  };

  return (
    <div>
      <form className="inputBox" onSubmit={create}>
        <Link href={"/"}>home</Link>
        <section className="btn">
          <button onClick={() => setPageStatus("LIST")}>취소</button>
          <button type={"submit"}>완료</button>
        </section>
        <p name={"img"}></p>
        <p name={"name"}></p>
        <p>
          <input onChange={valueChange} value={inputValue.content} type="text" name="content" className="contentBox" placeholder="무슨 일이 있었나요?" />
        </p>
      </form>
    </div>
  );
};

export default Edit;
