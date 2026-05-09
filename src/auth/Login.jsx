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
import { setAuthData } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { KeyIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export const Login = () => {
  const dispatch = useDispatch();

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

    const loginData = await login({ email, password });

    if (!loginData || !loginData.token) {
      setIsLoading(false);
      return;
    }

    setAccessToken(loginData.token);
    dispatch(setAuthData(loginData));

    setIsLoading(false);
  };

  return (
    <LoginWrapper>
      <Toaster richColors position="top-center" />
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Email</Label>
        </div>
        <InputWrapper>
          <KeyIcon />
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
          <LockClosedIcon />
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
