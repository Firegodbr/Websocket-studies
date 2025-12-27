class Chat:
    __conversation: list

    def __init__(self):
        self.__conversation = []

    def add_message(self, message: str):
        self.__conversation.append(message)
    def get_messages(self):
        return self.__conversation
chat = Chat()
