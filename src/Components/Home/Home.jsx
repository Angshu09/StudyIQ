import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import Card from "../Card/Card";
import SearchBox from "../SearchBox/SearchBox";
import { Context } from "../../Context/Context";

export default function Home() {
  const { showResult, recent, resultData, loading, responseData } =
    useContext(Context);

  return (
    <div className="flex-1 min-h-[100vh] relative font-custom px-4 sm:px-5 flex flex-col justify-between">
      <div className="nav flex justify-between items-center py-4 text-xl sm:text-2xl">
        <h1 className="font-semibold headingFont">StudyIQ</h1>
        <img
          src={assets.user}
          className="w-[41px] bg-black rounded-full"
          alt="user-png"
        />
      </div>

      <div>
        {!showResult ? (
          <div className="container animate-fadeIn max-w-[900px] m-auto bg-white">
            <div className="message font-semibold">
              <p>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-purple-400 to-blue-400 text-4xl sm:text-5xl font-semibold">
                  Hey, there
                </span>
              </p>
            </div>

            <div className="suggestions grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-5 sm:mt-8">
              {responseData.length > 0 ? (
                responseData.map((question, index) => (
                  <Card key={index} text={question} />
                ))
              ) : (
                <p className=" text-gray-500">Loading suggestions...</p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-[900px] max-h-[65vh] m-auto text-md overflow-y-scroll hide-scrollbar">
            <div className="flex gap-3 sm:gap-5 items-center mb-6">
              <img
                className="w-[30px] sm:w-[40px] rounded-full"
                src={assets.user}
                alt="user"
              />
              <p className="font-semibold">{recent}</p>
            </div>
            {loading ? (
              <div className="flex justify-start">
                <img
                  className="w-[30px] sm:w-[40px]"
                  src={assets.loader}
                  alt="loading"
                />
              </div>
            ) : (
              <div className="flex items-start gap-3 sm:gap-5">
                <img
                  className="w-[42px] rounded-full"
                  src={assets.bot}
                  alt="gemini"
                />
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="">
        <div className="max-w-[900px] m-auto py-4">
          <SearchBox />
          <p className="text-center text-[10px] mt-2">
            StudyIQ may display incorrect information, so please double-check
            its responses.
          </p>
        </div>
      </div>
    </div>
  );
}
