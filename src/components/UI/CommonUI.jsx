import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 4px;
  width: 700px;
`;

export const Form = styled.form`
  background-color: white;
  padding: 64px 48px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 32px;
`;

export const InputGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 107%;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  margin-top: 16px;
`;

export const LinkContainer = styled.div`
  text-align: center;
  margin-top: 16px;
`;

// Shared Input Component
export const FormInput = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <InputGroup>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </InputGroup>
);
