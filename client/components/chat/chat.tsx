"use client";

import { useEffect, useState } from "react";
import ChatForm from "./chat-form";
import parse from "html-react-parser";
import { getData } from "@/apis/api";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

type THistory = {
  user: {
    prompt: string;
  };
  ai: string;
};

const Chat = () => {
  const [history, setHistory] = useState<THistory[]>([]);

  const fetchHistory = async () => {
    try {
      const response = await getData({ endPoint: "/history" });
      setHistory(response.history);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
    hljs.initHighlighting();
  }, []);

  return (
    <section className=" h-screen">
      <div className=" pt-[62px] pb-[100px]">
        <div className="prose  m-auto dark:prose-invert ">
          <div className=" flex flex-col gap-5">
            {history &&
              history?.map((item, index) => (
                <div
                  key={index}
                  className=" bg-accent py-5 px-2 mx-2 md:mx-0 md:p-5 rounded-[10px]"
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
          </div>
        </div>
      </div>

      <div className=" fixed bottom-0 w-full bg-background flex justify-center items-center  p-2">
        <ChatForm fetchHistory={fetchHistory} />
      </div>
    </section>
  );
};

export default Chat;
