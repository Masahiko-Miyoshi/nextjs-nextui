import { useState, useEffect,useRef } from 'react';
import { ChatInput } from './ChatInput';
import  {ChatBubble}  from './ChatBubble';
import { Loading } from "@nextui-org/react";
import { Data } from '@/data/sample-data';


type Message = {
    sender: "user" | "bot";
    content: string;
  };

export const ChatUI: React.FC = () => {
    // const [messages, setMessages] = useState<Message[]>([]);
    const [messages, setMessages] = 
    useState<Message[]>([{sender: "bot", content:"こんにちは、私は優秀な臨床検査スペシャリストFR13ボットです。質問してください。"}]);
    
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
      // const response = await sendMessage(message);
      fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chat: message })
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        const response = data.message;
        /*
        const response =`本日のアッセイ処理能力は63テスト/時間です。平常時より処理能力は低下しています。
        理由として以下の２つが考られます。
        1.本病院では午前10時前後にオーダー受付がピークを迎えますが、午前11時に試薬不足のため23分間サンプル停止状態になっています。
        2.午後2時30分の廃液ボトルが満杯になり40分間程度サンプリング停止状態になってます。
        したがって、次の運用を提案します。
        オーダーのピークを迎える前の午前9時までには試薬を十分にセットしてください。また、分析開始前には朝一番で廃液ボトルを空にして分析を開始するようにしてください。
        それにより、サンプル停止状態を防ぐことができアッセイの処理能力をあげることができ、検査効率の向上につながります。`
        */
    
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", content: response },
        ]);
        setIsLoading(false);

      });

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

