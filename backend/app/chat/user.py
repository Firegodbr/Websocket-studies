from fastapi import WebSocket
from uuid import uuid4

class User:
    def __init__(self, websocket: WebSocket):
        self.__user_id = str(uuid4())
        self.__websocket = websocket
        self.__username = "Unknown"  # Default username

    @property
    def user_id(self):
        """Getter for user_id"""
        return self.__user_id

    @property
    def websocket(self):
        """Getter for websocket"""
        return self.__websocket

    @property
    def username(self):
        """Getter for username"""
        return self.__username

    @username.setter
    def username(self, new_username: str):
        """Setter for username"""
        self.__username = new_username

    def __str__(self):
        return self.__username

    def dict(self):
        """Return user data as a dictionary"""
        return {"userId": self.user_id, "username": self.username}

