"use client";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import React, { useRef } from "react";
import { postData } from "@/apis/api";

type THistory = {
  fetchHistory: () => void;
};

const ChatForm: React.FC<THistory> = ({ fetchHistory }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (prompt: string) => {
    try {
      await postData({ endPoint: "/chat", data: { prompt } });
      textareaRef.current!.value = "";
      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

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
