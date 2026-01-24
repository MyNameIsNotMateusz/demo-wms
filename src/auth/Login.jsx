import {
  LoginWrapper,
  Form,
  Label,
  InputWrapper,
  Input,
  SignInButton,
  InfoText,
  HighlightText,
} from "./Login.styles";
import { useState } from "react";
import { Toaster } from "sonner";
import { handleError } from "../utils/alerts";
import { useAuth } from "./AuthProvider";
import { login } from "../api/authApi";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setAccessToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      handleError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    try {
      const loginData = await login({ email, password });
      if (!loginData.token) return;
      setAccessToken(loginData.token);
    } catch (error) {
      handleError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <Toaster richColors position="top-center" />
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Email</Label>
        </div>
        <InputWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height="20"
            width="20"
            fill="#aaa"
          >
            <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
          </svg>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <div>
          <Label>Password</Label>
        </div>
        <InputWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height="20"
            width="20"
            fill="#aaa"
          >
            <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
          </svg>
          <Input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <SignInButton disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </SignInButton>
        <InfoText>
          No account? <HighlightText>Ask admin</HighlightText>
        </InfoText>
        <InfoText>An admin can create one for you</InfoText>
      </Form>
    </LoginWrapper>
  );
};
