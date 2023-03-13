import { Statusgroup } from "@/context/StatusContext";
import axios from "axios";
import { useContext, useState } from "react";
import styles from "@/styles/Contenteditor.module.scss";

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
    await axios.put(`/api/${inputValue.id}`, inputValue);
    setPageStatus("LIST");
  };

  return (
    <div>
      <form className={styles.Contenteditor} onSubmit={create}>
        <div className={styles.profile}>
          <div className={styles.pro_img}>
            <img src={`/img/poke_profile_img/pokballpixel-001.png`} alt=""></img>
          </div>
          <p></p>
        </div>
        <div className={styles.textBox}>
          <textarea onChange={valueChange} value={inputValue.content} type="text" name="content" className="contentBox" placeholder="무슨 일이 있었나요?" />
          <section>
            <button className={styles.Dbtn} onClick={() => setPageStatus("LIST")}>
              취소
            </button>
            <button className={styles.Cbtn} type={"submit"}>
              완료
            </button>
          </section>
        </div>
      </form>
    </div>
  );
};

export default Edit;
