import React from "react";

function RecievedMessage({ Message }) {
  return (
    <div
      className={`p-3 h-fit w-fit bg-pink-400 text-white rounded-tl-lg rounded-tr-lg rounded-br-lg`}
    >
      <span>{`${Message}`}</span>
    </div>
  );
}

export default RecievedMessage;
