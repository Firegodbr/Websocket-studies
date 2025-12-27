type TableListProps = {
  messages: chatMessagesType[];
  userId: string;
};

const TableList = ({ messages, userId }: TableListProps) => {
  return (
    <div className="overflow-y-auto">
      {messages.length === 0 ? (
        <div className="text-center text-sm text-gray-500">
          No messages
        </div>
      ) : (
        messages.map((el, i) => (
          <div
            key={`${el["id"]}-${i}`}
            className={`flex ${userId === el["user"] ? "justify-end" : "justify-start"} py-2`}
          >
            <div
              className={`max-w-3/4 p-3 text-sm rounded-lg ${
                userId === el["user"] ? "bg-green-400 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {el["message"]}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TableList;
