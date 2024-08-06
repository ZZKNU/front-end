import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLogin } from "../apis/api";

const AccountForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navi = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // function : 로그인 API 호출 //
      const loginSuccess = await getLogin(email, password);
      console.log("Login attempt with:", { email, password });
      if (loginSuccess) {
        navi("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error("Login failed", err);
      setErrorMessage(
        "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">로그인</h2>
      <form onSubmit={handleSubmit} method="POST" className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-600/40 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            로그인
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        계정이 없으신가요?{" "}
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default AccountForm;
