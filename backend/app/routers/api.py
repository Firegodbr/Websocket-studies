from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.chat.chat import chat
from app.schema.chat import ChatRequest
from loguru import logger
from uuid import uuid4
route = APIRouter()


@route.get(path="/health", tags=["Root"])
def health_endpoint():
    return {"message": "All system okay"}

@route.websocket(path="/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    user_id = str(uuid4())
    await websocket.send_json({"type": "userId", "id": user_id})
    try:
        while True:
            data = await websocket.receive_json()
            chat_request = ChatRequest(**data)
            chat.new_person(websocket, user_id)
            match chat_request.type:
                case "message":
                    await chat.add_message(chat_request.input_value, user_id)
                case "get_messages":
                    messages = chat.get_messages()
                    await websocket.send_json({"type": "list_message", "messages": messages})
    except WebSocketDisconnect:
        logger.info("Client disconnected normally (1001)")

    except Exception as e:
        logger.error(f"Unexpected error: {e}")

    finally:
        chat.remove_person(user_id)
        logger.info("Cleaning up WebSocket resources")
