from fastapi import WebSocket


class Chat:
    __conversation: list = []
    __count: int = 0
    __users: dict = {}

    def __init__(self):
        self.__conversation = []

    async def __notify_new_message(self):
        # Notify all users about the new message
        for user_id, websocket in self.__users.items():  # Iterate through all users
            try:
                await websocket.send_json({"type": "list_message", "messages": self.get_messages()})
            except Exception as e:
                print(f"Error sending message to {user_id}: {e}")

    async def add_message(self, message: str, user_id: str):
        self.__conversation.append(
            {"id": self.__count, "user": user_id, "message": message})
        self.__count += 1
        await self.__notify_new_message()

    def get_messages(self):
        return self.__conversation

    def new_person(self, websocket: WebSocket, user_id: str):
        self.__users[user_id] = websocket

    def remove_person(self, user_id: str):
        if user_id in self.__users:
            del self.__users[user_id]


chat = Chat()
