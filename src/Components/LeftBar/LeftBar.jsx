import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

export default function LeftBar() {
  const [click, setClick] = useState(false);
  const { onSend, setRecent, prev, newChat } = useContext(Context);

  const load = async (prompt) => {
    setRecent(prompt);
    await onSend(prompt);
  };

  return (
    <div className="LeftBar hidden sm:block font-custom h-[100vh] bg-[#e3e8ff] py-4 px-5 flex-col">

      <div className="h-[10%]">
        <img
          onClick={() => setClick(!click)}
          className="w-[22px] block cursor-pointer"
          src={click ? assets.menu2 : assets.menu}
          alt="menu"
        />
      </div>

      <div className="h-[15%]">
        <div onClick={() => newChat()} className="new-chat hover:scale-[1.04] transition-all  bg-[#c5cfff] cursor-pointer inline-flex px-3 py-3 rounded-full items-center gap-2">
          <img className="w-[18px]" src={assets.plus} alt="" />
          {click ? <p className="text-[14px] font-semibold">New Chat</p> : null}
        </div>
      </div>

      <div className="h-[75%]">
        {click ? (
          <div className="recent h-full flex flex-col animate-fadeIn">
            <p className="title h-[10%] font-bold">Recent</p>
            <div className="hide-scrollbar h-[90%] overflow-scroll">
              {prev.map((item, index) => {
                return (
                  <div
                    onClick={() => load(item)}
                    key={index}
                    className="entries flex items-start gap-3 p-3 pr-5 rounded-full hover:bg-[#c5cfff] cursor-pointer"
                  >
                    <img
                      className="w-[20px]"
                      src={assets.message}
                      alt="message-icon"
                    />
                    <p>{item.slice(0, 12)}...</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

    </div>
  );
}
