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

const AccountForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // function : Login API 호출 로직 //
      console.log("Login attempt with:", { email, password });
    } catch (err) {
      console.error("Login failed", err);
      setErrorMessage(
        "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
      );
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>로그인</Title>
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit">로그인</Button>
        <LinkContainer>
          계정이 없으신가요? <Link to="/Signup">새 계정 만들기</Link>
        </LinkContainer>
      </Form>
    </FormContainer>
  );
};

export default AccountForm;
