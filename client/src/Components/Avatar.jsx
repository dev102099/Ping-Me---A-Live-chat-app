import React from "react";

function Avatar() {
  return (
    <div className="flex gap-3 items-center">
      <div className="h-14 w-14 rounded-full bg-slate-100 flex justify-center items-center">
        <span className="text-white font-bold">T</span>
      </div>
      <div className="flex flex-col ">
        <span className="  text-lg">Dev Parpyani</span>
        <span>😈</span>
      </div>
    </div>
  );
}

export default Avatar;
