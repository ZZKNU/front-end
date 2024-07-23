import { Button } from "../components/UI/CommonUI";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const navi = useNavigate();
  return (
    <>
      <h1>임시 메인</h1>
      <Button onClick={() => navi("/login")}>Login</Button>
    </>
  );
};

export default MainPage;
