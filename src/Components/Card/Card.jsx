import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import { assets } from "../../assets/assets";

export default function Card({ text }) {
  const {setInput} = useContext(Context)
  return (
    <div onClick={() => setInput(text)}  className="card bg-[#e3e8ff] flex justify-between flex-col hover:bg-[#c5cfff] transition-all cursor-pointer h-auto gap-5 text-[12px] sm:text-[13px] rounded-lg p-4">
      <p>{text}</p>
      <div className="flex justify-end">
        <img
          className=" w-[20px]"
          src={assets.searchGlass}
          alt="icon"
        />
      </div>
    </div>
  );
}
