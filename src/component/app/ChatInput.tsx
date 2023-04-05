import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';


interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [inputKey, setInputKey] = useState(0);


  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setInputKey((prevKey) => prevKey + 1);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        borderTop: "1px solid #eaeaea",
      }}
    >
      <Input
      
        style={{ flexGrow: 1, marginRight: "0.5rem",width: "1200px"  }}
        placeholder="Type your message..."
        //value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        clearable
        key={inputKey}
      />
      <Button
        
        auto
        
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </div>
  );
/*
  return (
    <div>
      <Input
        
        //value={message}
        onChange={(e) => setMessage(e.target.value)}
        
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  );
  */
};
