import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosCrossDomainHttpService, {axiosHttpService} from "src/utils/httpService";
import { isPasswordValid } from './helper'
const API_REGISTER = import.meta.env.VITE_API_PORTAL_REGISTER

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = async () => {
        if(!isPasswordValid(password)) {
            setError('Mật khẩu phải chứa ít nhất 8 ký tự. Trong đó có cả ký tự chữ, ký tự số và ký tự đặc biệt (!, #, ...)');
            return ;
        }
        axiosHttpService.post(API_REGISTER, {
            email: email,
            username: username,
            password: password,
        }).then((res) => {
            console.log(res);
            navigate("/login");
        }).catch((err) => {
            setError('Đăng kí thất bại');
            console.log(err);
        })
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Container maxWidth="sm">
                <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 10px grey" }}>
                    <Typography variant="h4" align="center">
                        Đăng ký tài khoản
                    </Typography>
                    <form>
                        <TextField
                            label="Tên đăng nhập"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            label="Mật khẩu"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            label="Nhập lại mật khẩu"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            type="password"
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange}
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
                            onClick={handleRegister}
                        >
                            Đăng ký
                        </Button>
                        <Typography variant="body2" align="center" style={{ marginTop: "10px" }}>
                            Bạn đã có tài khoản? <Link href="/login">Đăng nhập</Link>
                        </Typography>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default Register;
