from pydantic import BaseModel

class ChatRequest(BaseModel):
    type: str
    input_value: str