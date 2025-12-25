from fastapi import APIRouter, WebSocket

route = APIRouter()

@route.get(path="/health", tags=["Root"])
def health_endpoint():
    return {"message": "All system okay"}

@route.websocket(path="/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message received was {data}")