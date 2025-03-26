import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <Link to={"/chat"}>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="flex justify-center items-center bg-gray-300 h-13 w-13 rounded-full ">
            <h2 className="font-bold text-white  ">T</h2>
          </div>

          <div className="flex flex-col justify-between">
            <h2 className="font-semibold">Name</h2>
            <h3 className="text-sm text-gray-300">Last Message </h3>
          </div>
        </div>
        <div className="flex items-end">
          <span className="text-gray-300">time</span>
        </div>
      </div>
    </Link>
  );
}

export default Contact;
