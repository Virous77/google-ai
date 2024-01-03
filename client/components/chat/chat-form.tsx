"use client";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { postData } from "@/apis/api";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

type THistory = {
  fetchHistory: () => void;
  userPrompt: string;
  setUserPrompt: Dispatch<SetStateAction<string>>;
};

const ChatForm: React.FC<THistory> = ({ fetchHistory, setUserPrompt }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (prompt: string) => {
    try {
      setUserPrompt(prompt);
      textareaRef.current!.value = "";
      await postData({ endPoint: "/chat", data: { prompt } });
      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hljs.highlightAll();
    fetchHistory();
  }, []);

  return (
    <div className=" w-full  md:w-[70%] m-auto relative">
      <Textarea ref={textareaRef} />
      <Button
        onClick={() => onSubmit(textareaRef.current?.value || "")}
        className=" absolute right-2 top-2"
      >
        send
      </Button>
      <p className=" text-center text-[10px] md:text-[13px] mt-1 mb-1 ">
        Google AI can make mistakes. Consider checking important information.
      </p>
    </div>
  );
};

export default ChatForm;
