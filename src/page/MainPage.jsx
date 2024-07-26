import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">임시 메인</h1>
      <Link to="/alllist">게시글 보기</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default MainPage;
