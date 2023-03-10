import React, { useState } from "react";

const Color = () => {
  const [color, setColor] = useState();
  if (type[0] === "불꽃" || type[0] === "에스퍼" || type[0] === "페어리") setColor("red");
  else if (type[0] === "물" || type[0] === "얼음" || type[0] === "비행" || type[0] === "강철") setColor("blue");
  else if (type[0] === "풀" || type[0] === "벌레") setColor("green");
  else if (type[0] === "노말" || type[0] === "전기") setColor("yellow");
  else if (type[0] === "격투" || type[0] === "땅" || type[0] === "바위") setColor("brown");
  else if (type[0] === "독" || type[0] === "고스트" || type[0] === "드래곤") setColor("purple");

  console.log(color);

  return <div>Color</div>;
};

export default Color;
