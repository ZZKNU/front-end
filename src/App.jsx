import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/LoginPage";
import JoinPage from "./page/JoinPage";
import Navbar from "./components/Navbar";
import MainPage from "./page/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
