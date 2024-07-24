import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navi = useNavigate();

  const clickHandler = () => {
    navi("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">임시 메인</h1>
      <button onClick={clickHandler}>Login</button>
    </div>
  );
};

export default MainPage;
