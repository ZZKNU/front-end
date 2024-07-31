import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
