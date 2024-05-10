import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AuthenAPIService from "src/service/api/authenAPIService";


const LoginContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const LoginForm = styled(Paper)`
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
`;

const ButtonContainer = styled(Box)`
  margin-top: 1rem; 
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const SsoButton = styled(Button)`
  background-color: #007bff;
  color: white;
  text-transform: uppercase;
  font-weight: medium;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  margin-top: 1rem; 
  &:hover {
    background-color: #0069d9;
  }
`;

const LoginButton = styled(Button)`
  background-color: #28a745; 
  color: white;
  text-transform: uppercase;
  font-weight: medium;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  &:hover {
    background-color: #218838; 
  }
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (sso) => {
    const res = await AuthenAPIService.login(username, password, sso);
    if (res) {
      localStorage.setItem("isLogin", 1);
      window.location.reload();
    } else {
      setErr("Tài khoản hoặc mật khẩu không đúng");
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Typography variant="h6" component="h1" gutterBottom>
          Bạn cần đăng nhập để tiếp tục
        </Typography>
        <TextField
          label="Tài khoản"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          label="Mật khẩu"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography color="error" variant="body2" component="p" gutterBottom>
          {err}
        </Typography>
        <ButtonContainer>
          <LoginButton onClick={() => handleLogin(false)}>
            Đăng nhập
          </LoginButton>
          <SsoButton
            onClick={() => handleLogin(true)}
          >
            Đăng nhập SSO
          </SsoButton>
        </ButtonContainer>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
