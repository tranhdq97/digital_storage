import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Link, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AuthenAPIService from "src/service/api/authenAPIService";
import { useDispatch } from "react-redux";
import { LoginAction } from "src/service/actions/userAction";
import UserAPIService from "src/service/api/userAPIService";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const response = await AuthenAPIService.login(username, password);
    if (response) {
      try {
        const userInfo = await UserAPIService.getUserInfo();
        if (userInfo) {
          dispatch(LoginAction(userInfo.user.email, userInfo.user.username));
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("Đăng nhập thất bại");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 10px grey" }}>
          <Typography variant="h4" align="center">
            Đăng nhập
          </Typography>
          <form>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              label="Mật khẩu"
              fullWidth
              margin="normal"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
            <Typography variant="body2" align="center" style={{ marginTop: "10px" }}>
              Bạn chưa có tài khoản? <Link href="/register">Đăng ký</Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
