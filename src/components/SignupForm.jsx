import { useState } from "react";
import {
  FormContainer,
  Form,
  Title,
  Button,
  ErrorMessage,
  LinkContainer,
  FormInput,
} from "../components/UI/CommonUI";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      // function : 회원가입 API 호출 //
      console.log("Signup attempt with:", { name, email, password });
    } catch (err) {
      console.error("Signup failed", err);
      setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <FormInput
          label="이름"
          id="name"
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormInput
          label="이메일"
          id="email"
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormInput
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit">회원가입</Button>
        <LinkContainer>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </LinkContainer>
      </Form>
    </FormContainer>
  );
};

export default SignupForm;
