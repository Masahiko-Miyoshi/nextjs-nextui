import { useState, useEffect,useRef } from 'react';
import { sendMessage } from '@/pages/api/chatgpt';
import { ChatInput } from './ChatInput';
import  {ChatBubble}  from './ChatBubble';
import { Loading } from "@nextui-org/react";


type Message = {
    sender: "user" | "bot";
    content: string;
  };

export const ChatUI: React.FC = () => {
    // const [messages, setMessages] = useState<Message[]>([]);
    const [messages, setMessages] = 
    useState<Message[]>([{sender: "bot", content:"こんにちは、私はFR13ボットです。質問してください。"}]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(scrollToBottom, [messages]);
  
    const handleSendMessage = async (message: string) => {
      setIsLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", content: message },
      ]);
      if(message[message.length-1] !== "。" && message[message.length-1] !== "？" && message[message.length-1] !== "！"){
        message = message + "。";
      }
      const response = await sendMessage(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: response },
      ]);
      setIsLoading(false);
    };
  
    

    return (
        <div
            style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            }}
       
        >
        <div
          style={{
            overflowY: "auto",
            flexGrow: 1,
            padding: "1rem",
          }}
        >
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              sender={message.sender === "user"}
              content={message.content}
            />
          ))}
          {isLoading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loading size="xl" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    );
    
};

/*
export const ChatUI: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(scrollToBottom, [messages]);
  
    const handleSendMessage = async (message: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", content: message },
      ]);
  
      const response = await sendMessage(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: response },
      ]);
    };
  
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          style={{
            overflowY: "auto",
            flexGrow: 1,
            padding: "1rem",
          }}
        >
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              sender={message.sender === "user"}
              content={message.content}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    );
  };
 */

