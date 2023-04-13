import React from "react";
import { Avatar } from "@nextui-org/react";

type ChatBubbleProps = {
  sender: boolean; // true for user, false for bot
  content: string;
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, content }) => {
    // const userAvatar = "/path/to/user-avatar.png"; // ユーザーアイコンのパス
    // const botAvatar = "/path/to/bot-avatar.png"; // ボットアイコンのパス
  
    return (
    <div
      style={{
        display: "flex",
        justifyContent: sender ? "flex-end" : "flex-start",
        marginBottom: "1rem",
      }}
    >
    {!sender && (
        <Avatar color="warning" text="Bot" size="xl"  style={{ marginRight: "0.5rem" }}/>
        // <Avatar
        //   src={botAvatar}
        //   size="sm"
        //   style={{ marginRight: "0.5rem" }}
        // />
    )}
      <div
        style={{
          backgroundColor: sender ? "#BE6DB7" : "#f0f0f0",
          color: sender ? "white" : "black",
          borderRadius: "1rem",
          padding: "0.75rem 1rem",
          maxWidth: "60%",
          wordBreak: "break-word",
          fontSize: "1.2rem",
        }}
      >
          <p style={{ whiteSpace: 'pre-line', fontSize: "1.2rem"}}>{content}</p>
        {/* {content} */}
      </div>
      {sender && (
        <Avatar color="secondary" text="User" size="xl"  style={{ color: "white",  marginLeft: "0.5rem" }}/>
        // <Avatar
        //   src={userAvatar}
        //   size="sm"
        //   style={{ marginLeft: "0.5rem" }}
        // />
      )}
    </div>
  );
};

