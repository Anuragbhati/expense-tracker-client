import { useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const AuthCard = styled.div`
  width: 400px;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const AuthHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  img {
    height: 60px;
    margin-bottom: 1.5rem;
  }
`;

const AuthTitle = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const AuthToggle = styled.button`
  background: none;
  border: none;
  color: #4a90e2;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: inherit;
  &:hover {
    color: #3a7bc8;
  }
`;

const Auth = () => {
  const location = useLocation();
  const [mode, setMode] = useState(
    location.pathname.includes("login") ? "login" : "register"
  );
  const navigate = useNavigate();

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <AuthTitle>
            {mode === "login" ? "Welcome Back" : "Get Started"}
          </AuthTitle>
          <p>
            {mode === "login"
              ? "Track your expenses and save money"
              : "Start managing your finances today"}
          </p>
          <p style={{ marginTop: "1rem" }}>
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <AuthToggle
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                navigate(mode === "login" ? "/register" : "/login");
              }}
            >
              {mode === "login" ? "Register" : "Login"}
            </AuthToggle>
          </p>
        </AuthHeader>

        {mode === "login" ? <Login /> : <Register />}
      </AuthCard>
    </AuthContainer>
  );
};

export default Auth;
