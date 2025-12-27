from fastapi import APIRouter, WebSocket
from app.chat.chat import chat
from app.schema.chat import ChatRequest
route = APIRouter()

@route.get(path="/health", tags=["Root"])
def health_endpoint():
    return {"message": "All system okay"}

@route.websocket(path="/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        chat_request = ChatRequest(**data)
        match chat_request.type:
            case "message":
                chat.add_message(chat_request.input_value)
                await websocket.send_text("message added")
            case "get_messages":
                messages = chat.get_messages()
                await websocket.send_json(messages)