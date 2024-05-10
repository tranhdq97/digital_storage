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
import { Fragment } from "react";
import AuthenAPIService from "src/service/api/authenAPIService";
import { notifySuccess } from "src/custom/Function";
import { Modal, Input } from "antd";


const LoginEoffice = ({
    open,
    setOpen,
    setStateEoffice = null
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const handleLogin = async () => {
        const response = await AuthenAPIService.loginEoffice(username, password);
        if (response !== null) {
            localStorage.setItem("eoffice_token", response.token);
            notifySuccess("Đăng nhập thành công");
            setOpen(false);
            setStateEoffice && setStateEoffice(true);
        } else {
            setErr("Tài khoản hoặc mật khẩu không đúng");
        }

    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Modal
            className="z-[555]"
            onOk={handleLogin}
            onCancel={() => setOpen(false)}
            title="Đăng nhập Eoffice"
            open={open}
        >

            <div className="flex justify-between py-[12px]">
                <span>Email</span>
                <Input
                    name="name"
                    onChange={handleUsernameChange}
                    type="text"
                    className="w-[70%]"
                />
            </div>

            <div className="flex justify-between py-[12px]">
                <span>Mật khẩu</span>
                <Input
                    name="name"
                    onChange={handlePasswordChange}
                    type="password"
                    className="w-[70%]"
                />
            </div>

            {open && (
                <div className="flex justify-center items-center text-red-500">{err}</div>
            )}

        </Modal>
    );
};

export default LoginEoffice;
