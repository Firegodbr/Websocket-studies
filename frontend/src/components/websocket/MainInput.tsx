type MainInputProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
};

const MainInput: React.FC<MainInputProps> = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 max-w-md mx-auto">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Update message
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        placeholder="Type your message here"
      />
      <button
        onClick={sendMessage}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Send to websocket
      </button>
    </div>
  );
};

export default MainInput;
