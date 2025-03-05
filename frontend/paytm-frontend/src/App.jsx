import { Route, Routes } from "react-router-dom";
import "./index.css";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

         <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/send" element={<SendMoney />} />   */}
      </Routes>
    </>
  );
}

export default App;
