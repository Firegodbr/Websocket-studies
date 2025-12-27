type chatMessagesType = {
  id: string;
  message: string;
  user: string;
};

type WebSocketMessage =
  | { type: "notification"; message: string }
  | { type: "list_message"; messages: chatMessagesType[] }
  | { type: "message"; content: string }
  | { type: "userId"; id: string };