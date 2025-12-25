import "./App.css";
import { ToastContainer } from "react-toastify";
import CheckSystems from "./components/CheckSystems";
import WebsocketHandler from "./components/WebsocketHandler";
function App() {
  return (
    <>
      <ToastContainer />
      <CheckSystems />
      <WebsocketHandler />
    </>
  );
}

export default App;
