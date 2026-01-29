import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectDetails from "./pages/ProjectDetails";
import Navbar from "./components/Navbar";
import AddProject from "./pages/AddProject";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Added here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course/:id" element={<ProjectDetails />} />
        <Route path="/add-project" element={<AddProject />} /> {/* New route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
