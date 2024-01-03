"use client";

import { useState } from "react";
import ChatForm from "./chat-form";
import parse from "html-react-parser";
import { getData } from "@/apis/api";

type THistory = {
  user: {
    prompt: string;
  };
  ai: string;
};

const Chat = () => {
  const [history, setHistory] = useState<THistory[]>([]);
  const [userPrompt, setUserPrompt] = useState<string>("");

  const scrollToBottom = (el: HTMLDivElement | null) => {
    if (el) {
      const navbarHeight = 63;
      const targetTop =
        el.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await getData({ endPoint: "/history" });
      setHistory(response.history);
      setUserPrompt("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=" h-screen">
      <div className=" pt-[62px] pb-[100px]">
        <div className="prose  m-auto dark:prose-invert ">
          <div className=" flex flex-col gap-5 w-full md:w-[625px]">
            {history &&
              history?.map((item, index) => (
                <div
                  key={index}
                  className=" bg-accent py-5 px-2 mx-2 md:mx-0 md:p-5 rounded-[10px]"
                  ref={scrollToBottom}
                >
                  <span className=" flex items-center gap-4">
                    {" "}
                    <p className=" w-[25px] h-[25px] rounded-full bg-primary "></p>{" "}
                    {item.user.prompt}
                  </span>
                  <div className=" flex items-start gap-3">
                    <p className=" w-[25px] h-[25px] rounded-full bg-foreground "></p>{" "}
                    <div className="res">{parse(item.ai)}</div>
                  </div>
                </div>
              ))}
            {userPrompt && (
              <p
                className=" bg-accent w-[97%] md:w-full opacity-70 p-5 pl-7  m-auto rounded-[10px]"
                ref={scrollToBottom}
              >
                {userPrompt}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className=" fixed bottom-0 w-full bg-background flex justify-center items-center  p-2">
        <ChatForm
          fetchHistory={fetchHistory}
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
        />
      </div>
    </section>
  );
};

export default Chat;
