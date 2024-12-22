import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

export default function SearchBox() {
  const { onSend, input, setInput } = useContext(Context);

  return (
    <div className="search-box flex items-center text-sm justify-between gap-3 py-[15px] px-[22px] bg-[#e3e8ff] rounded-full">
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="flex-1 bg-transparent outline-none border-none text-[black]"
        type="text"
        placeholder="Enter here"
      />
      {input ? (
        <div>
          <img
            onClick={() => onSend()}
            className="w-[24px] cursor-pointer"
            src={assets.send}
            alt="send"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
