import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJoin, getCheckNickname, getCheckEmail } from "../apis/api";
import LoadingSpinner from "./LoadingSpinner";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navi = useNavigate();

  const handleNicknameCheck = async () => {
    if (!name.trim()) {
      setNicknameError("");
      return;
    }
    try {
      const isNicknameAvailable = await getCheckNickname(name);
      if (isNicknameAvailable) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      } else {
        setIsNicknameChecked(true);
        setNicknameError("사용 가능한 닉네임입니다.");
      }
    } catch (err) {
      console.error("Nickname check failed", err);
      setNicknameError("닉네임 중복 체크에 실패했습니다.");
    }
  };

  const handleEmailCheck = async () => {
    if (!email.trim()) {
      setEmailError("");
      return;
    }
    try {
      const isEmailAvailable = await getCheckEmail(email);
      if (isEmailAvailable) {
        setEmailError("이미 사용 중인 이메일입니다.");
        setIsEmailChecked(false);
      } else {
        setIsEmailChecked(true);
        setEmailError("사용 가능한 이메일입니다.");
      }
    } catch (err) {
      console.error("Email check failed", err);
      setEmailError("이메일 중복 체크에 실패했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }
    if (!birthDate) {
      setErrorMessage("생년월일을 선택해주세요.");
      setIsLoading(false);
      return;
    }
    if (!isNicknameChecked) {
      setErrorMessage("닉네임 중복 체크를 해주세요.");
      setIsLoading(false);
      return;
    }
    if (!isEmailChecked) {
      setErrorMessage("이메일 중복 체크를 해주세요.");
      setIsLoading(false);
      return;
    }
    try {
      const birthDateObj = new Date(birthDate);
      const formattedBirthDate = birthDateObj.toISOString().split("T")[0];
      // function : 회원가입 API 호출 //
      const res = await getJoin(email, password, name, formattedBirthDate);
      console.log(
        { name, email, password, birthDate: formattedBirthDate },
        res
      );
      navi("/login");
    } catch (err) {
      console.error("Signup failed", err);
      setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        회원가입
      </h2>
      <form onSubmit={handleSubmit} method="POST" className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            이름
          </label>
          <div className="flex space-x-2">
            <input
              id="name"
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={handleNicknameCheck}
              className="mt-1 px-3 py-1 bg-amber-600 text-white rounded-md shadow-sm hover:bg-amber-500 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
            >
              중복 확인
            </button>
          </div>
          {isNicknameChecked ? (
            <p className="text-blue-500 text-sm">{nicknameError}</p>
          ) : (
            <p className="text-red-500 text-sm">{nicknameError}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            이메일
          </label>
          <div className="flex space-x-2">
            <input
              id="email"
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={handleEmailCheck}
              className="mt-1 px-3 py-1 bg-amber-600 text-white rounded-md shadow-sm hover:bg-amber-500 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
            >
              중복 확인
            </button>
          </div>
          {isEmailChecked ? (
            <p className="text-blue-500 text-sm">{emailError}</p>
          ) : (
            <p className="text-red-500 text-sm">{emailError}</p>
          )}
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
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            생년월일
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div>
          <button
            type="submit"
            disabled={!isEmailChecked || !isNicknameChecked}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black ${
              !isNicknameChecked || !isEmailChecked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-600/40 hover:bg-amber-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? <LoadingSpinner /> : "회원가입"}
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          로그인
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
