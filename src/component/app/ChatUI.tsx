import { useState, useEffect,useRef } from 'react';
import { ChatInput } from './ChatInput';
import  {ChatBubble}  from './ChatBubble';
import { Loading } from "@nextui-org/react";
import type  {GPTMessage}  from '@/pages/api/chatgpt';import { toASCII } from 'punycode';
;



type Message = {
    sender: "user" | "assistant" | "system";
    content: string;
  };

export const ChatUI: React.FC = () => {
    const maxTokens = 4096;
    let totalTokens=0;
    const [messages, setMessages] = 
    useState<Message[]>([{sender: "assistant", content:"こんにちは、私は臨床検査スペシャリストです。質問してください。"}]);
    
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

        // 会話履歴をコピーし、新しいユーザーメッセージを追加
      // const updatedMessages = [{ sender: "system", content: "あなたはドラえもんです。ドラえもんの口調で回答してください。第一人称は、ぼくです。" }, 
      const updatedMessages = [{ sender: "system", content: "あなたは簡潔に回答する優秀なアシスタントです" }, 
                              ...messages, { sender: "user", content: message },];

      // 会話履歴をAPIに渡すために、オブジェクトのプロパティ名を変更（senderからroleへ）
      const apiMessages:GPTMessage[] = updatedMessages.map((msg) => ({
        role: msg.sender === "user" ? "user" : (msg.sender === "assistant"?"assistant":"system"),
        //msg.contentの最後に句読点がある場合は追加しない
        content: msg.content[msg.content.length-1] === "。" ? msg.content : msg.content+"。",
      }))
      
      

      if(totalTokens>maxTokens-200){ //200トークンの余裕を持って上限辺りでメッセージを削除
        apiMessages.shift();
      }
    
      fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ chat: message+"。" })
         // 会話履歴を含むオブジェクトをAPIに渡す
        body: JSON.stringify({ chat: apiMessages})
      })
      .then(response => response.json())
      .then(data => {
        const response = data.message;
        //token数を更新
        totalTokens = data.usage.total_tokens;

         
        console.log(totalTokens)
        /*
        const response =`本日のアッセイ処理能力は63テスト/時間です。平常時より処理能力は低下しています。
        理由として以下の２つが考られます。
        1.本病院では午前10時前後にオーダー受付がピークを迎えますが、午前11時に試薬不足のため23分間サンプル停止状態になっています。
        2.午後2時30分の廃液 ボトルが満杯になり40分間程度サンプリング停止状態になってます。
        したがって、次の運用を提案します。
        オーダーのピークを迎える前の午前9時までには試薬を十分にセットしてください。また、分析開始前には朝一番で廃液ボトルを空にして分析を開始するようにしてください。
        それにより、サンプル停止状態を防ぐことができアッセイの処理能力をあげることができ、検査効率の向上につながります。`
        */
    
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "assistant", content: response },
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
              <Loading size="xl" color={"warning"}/>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    );
    
};

