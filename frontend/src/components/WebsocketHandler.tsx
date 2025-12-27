import { useEffect, useState, useRef } from "react";
import MainInput from "./websocket/MainInput";
import TableList from "./websocket/TableList";
import { toast } from "react-toastify";
import { formatMessageWebsocket } from "../helpers/utils";

const WebsocketHandler = () => {
  const [messages, setMessages] = useState<chatMessagesType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/api/ws"); // WebSocket server URL
    socketRef.current = socket;
    let interval: ReturnType<typeof setInterval> | null = null;
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(formatMessageWebsocket("get_messages", ""));
      }
      setConnected(true);
    };

    socket.onmessage = (event) => {
      // On receiving a message from the server, update the state
      const data: WebSocketMessage = JSON.parse(event.data);

      // console.log("Message from server:", data);
      switch (data.type) {
        case "notification":
          toast.info(data["message"]);
          break;
        case "list_message":
          setMessages((prev) => {
            const allIds = new Set(prev.map((el) => el.id));
            const notAddedIds = data.messages.filter(
              (el) => !allIds.has(el.id)
            );
            return [...notAddedIds, ...prev];
          });
          break;
        case "userId":
          setUserId(data["id"]);
          break;
      }
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
      if (interval) clearInterval(interval);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (socketRef.current && connected) {
      socketRef.current.send(formatMessageWebsocket("message", message));
    }
  };
  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Your ID: <span className="font-bold">{userId}</span>
      </h3>
      
      <div className="mb-4">
        <MainInput
          setMessage={setMessage}
          message={message}
          sendMessage={handleSendMessage}
        />
      </div>
      
      <div className="mt-4">
        {connected ? (
          <TableList messages={messages} userId={userId} />
        ) : (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 border-2 border-t-2 border-gray-500 rounded-full animate-spin"></div>
            <p className="text-gray-500">Connecting...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default WebsocketHandler;
