import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from "./pages/Task";
import Auth from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;