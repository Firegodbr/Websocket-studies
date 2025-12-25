import { useEffect, useState, useRef } from "react";
import MainInput from "./websocket/MainInput";
import TableList from "./websocket/TableList";
const WebsocketHandler = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/api/ws"); // WebSocket server URL
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setConnected(true);
    };

    socket.onmessage = (event) => {
      // On receiving a message from the server, update the state
      const data = event.data;
      console.log("Message from server:", data);
      setMessages((prev) => [...prev, data]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setConnected(false);
    };

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);
  const handleSendMessage = () => {
    if (socketRef.current && connected) {
      socketRef.current.send(message);
    }
  };
  return (
    <div>
      <MainInput
        setMessage={setMessage}
        message={message}
        sendMessage={handleSendMessage}
      />
      <TableList messages={messages} />
    </div>
  );
};
export default WebsocketHandler;
