type TableListProps = {
  messages: string[];
};

const TableList = ({ messages }: TableListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white border-collapse shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Messages</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td className="py-2 px-4 text-center text-sm text-gray-500">No messages</td>
            </tr>
          ) : (
            messages.map((el, i) => (
              <tr key={`${el}-${i}`} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-700">{el}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
