import React, { useState } from "react";

function SentMessage({ Message }) {
  const [color, setcolor] = useState("bg-blue-400");

  return (
    <div
      className={`p-3 h-fit w-fit ${color} text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg`}
    >
      <span>{`${Message}`}</span>
    </div>
  );
}

export default SentMessage;
