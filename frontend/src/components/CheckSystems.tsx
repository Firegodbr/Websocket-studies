import { toast } from "react-toastify";
const CheckSystems = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/health");
      if (response.status === 200) {
        const data = await response.json();
        toast.info(data["message"]);
      } else {
        toast.error("API cannot be reached");
        throw "API cannot be reached";
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error has occurred");
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  return (
    <div>
      <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">Check systems</button>
    </div>
  );
};
export default CheckSystems;
