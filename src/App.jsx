import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./page/LoginPage";
import JoinPage from "./page/JoinPage";
import Sidebar from "./components/Sidebar";
import MainPage from "./page/MainPage";
import CreatePage from "./page/CreatePage";
import AllListPage from "./page/AllListPage";
import BestListPage from "./page/BestListPage";
import MyPage from "./page/MyPage";
import ShowPage from "./page/ShowPage";
import EditPage from "./page/EditPage";
import MessagePage from "./page/MessagePage";

function App() {
  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <BrowserRouter>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<JoinPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/alllist" element={<AllListPage />} />
          <Route path="/bestlist" element={<BestListPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/list/:id" element={<ShowPage />} />
          <Route path="/list/:id/edit" element={<EditPage />} />
          <Route path="/messagelist" element={<MessagePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
