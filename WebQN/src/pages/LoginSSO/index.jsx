import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

const LoginContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const LoginForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const LoginSSO = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    // dispatch({ type: "LOGINED" });
    window.location.replace("https://hcnt-cre.github.io/LoginSSO/")
  }, [])

  return (
    <h1>
      <strong>
      Vui lòng chờ ...
      </strong>
    </h1>
  )
};

export default LoginSSO;
