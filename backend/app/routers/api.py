from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.chat.chat import chat
from app.schema.chat import ChatRequest
from loguru import logger
from app.chat.user import User
route = APIRouter()


@route.get(path="/health", tags=["Root"])
def health_endpoint():
    return {"message": "All system okay"}


@route.websocket(path="/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    user = User(websocket=websocket)
    await websocket.send_json({"type": "userId", "id": user.username})
    try:
        while True:
            data = await websocket.receive_json()
            chat_request = ChatRequest(**data)
            chat.new_person(user)
            match chat_request.type:
                case "message":
                    await chat.add_message(chat_request.input_value, user)
                case "get_messages":
                    messages = chat.get_messages()
                    await websocket.send_json({"type": "list_message", "messages": messages})
                case "change_name":
                    user.username = chat_request.input_value
    except WebSocketDisconnect:
        logger.info("Client disconnected normally (1001)")

    except Exception as e:
        logger.error(f"Unexpected error: {e}")

    finally:
        chat.remove_person(user.username)
        logger.info("Cleaning up WebSocket resources")
