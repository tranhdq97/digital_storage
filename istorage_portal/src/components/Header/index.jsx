import {
	AppBar,
	IconButton,
	Toolbar,
	Stack,
	Button,
	Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import QuocHuy from "src/assets/images/QuocHuy.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HEADER_FIXED } from "src/service/key";
import { useButtonClickOutside } from "src/hook/useButtonClickOutside";
import { useState } from "react";
import ModalChangeInfo from "../Modal/ChangeInfo";
import ModalChangePassword from "../Modal/ChangePassword";
import ModalPasswordRecovery from "../Modal/PasswordRecovery";
import { LogoutAction } from "src/service/actions/userAction";
import { useDispatch } from "react-redux";
import AuthenAPIService from "src/service/api/authenAPIService";

const buttonStyles = {
	"&:hover": {
		backgroundColor: "grey",
		color: "white",
		fontWeight: "bold", // Increase font weight on hover
	},
	fontSize: "0.8em",
	fontWeight: "bold", // Increase font size
	padding: "5px 10px", // Add padding to make the buttons larger
};

const Bar = () => {
	const dispatch = useDispatch();
	const [modalChangeInfo, setModalOpenChangeInfo] = useState(false);
	const [modalChangePassword, setModalOpenChangePassword] = useState(false);
	const [modalPasswordRecovery, setModalOpenPasswordRecovery] = useState(false);
	const navigate = useNavigate();

	const [openUser, setOpenUser] = useState(false);
	const user = useSelector((state) => state.user);

	console.log(user);
	const handleClose = () => {
		setOpenUser(false);
	}

	const [buttonRef, contentRef, toggleContent, showContent] =
		useButtonClickOutside(false, handleClose);

	const handleClickLogo = () => {
		navigate("/");
	};

	const handleClickCart = () => {
		navigate("/gio-hang");
	}
	const handleClickChangeInfo = () => {
		setModalOpenChangeInfo(true);
	}

	const handleClickChangePassword = () => {
		setModalOpenChangePassword(true);
	}

	const handleClickPasswordRecovery = () => {
		setModalOpenPasswordRecovery(true);
	}

	const handleClickLogout = async () => {
		setOpenUser(false);
		await AuthenAPIService.logout();
		dispatch(LogoutAction());
		toggleContent();
		navigate("/");
	}

	const cart = useSelector((state) => state.cart);

	let total = 0
	cart.cart.forEach((file) => total += file.docs.length)

	const handleClickUser = () => {
		if (user.isLogin) {
			// navigate("/nguoi-dung")
		} else {
			navigate("/login")
		}
	}

	return (
		<Toolbar
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<div className="flex justify-left items-center" onClick={handleClickLogo}>
				<IconButton size="large" aria-label="logo">
					<img src={QuocHuy} alt="QuocHuy" style={{ width: 50, height: 50 }} />
				</IconButton>
				<Typography
					variant="h6"
					sx={{
						cursor: "pointer",
						fontWeight: "bold",
						fontSize: "1.2rem",
					}}
				>
					ISTORAGE - Cổng thông tin khai thác
				</Typography>
			</div>

			<Stack direction="row" spacing={2}>
				<Button color="inherit" sx={buttonStyles}>
					Trạng thái phiếu tin
				</Button>
				<div className="relative">
					<Button color="inherit" sx={buttonStyles} onClick={handleClickCart}>
						Giỏ tài liệu
					</Button>
					<span className="absolute rounded-[50%] text-[10px] bg-white text-[#3498db] p-1 w-[16px] h-[16px] left-[90%] top-0 flex justify-center items-center">{total}</span>
				</div>

				<Button color="inherit" sx={buttonStyles}>
					Thông báo
				</Button>
				<div className="text-white text-center px-[5px] rounded-[5px]  relative">
					<Button
						color="inherit"
						sx={buttonStyles}
						onClick={user.isLogin ? toggleContent : handleClickUser}
						ref={buttonRef}
					>
						{user.isLogin ? user.username : "Đăng nhập"}
					</Button>
					{showContent && (
						<div
							ref={(el) => {
								contentRef.current[0] = el;
							}}
							className="rounded-[2px] text-left top-[40px] absolute bg-sky-500 z-10 right-0"
						>
							<div className="p-[2px] w-[220px] flex flex-col text-white">
								<Button className="text-[12px] text-white" onClick={handleClickChangeInfo}>Thay đổi thông tin cá nhân</Button>
								<Button className="text-[12px] text-white" onClick={handleClickChangePassword}>Đổi mật khẩu</Button>
								<Button className="text-[12px] text-white" onClick={handleClickPasswordRecovery}>Lấy lại mật khẩu</Button>
								<Button className="text-[12px] text-white" onClick={handleClickLogout}>Đăng xuất</Button>
							</div>
						</div>
					)}
				</div>
				<ModalChangeInfo modalOpen={modalChangeInfo} setModalOpen={setModalOpenChangeInfo} />
				<ModalChangePassword ModalChangePasswordOpen={modalChangePassword} setModalChangePasswordOpen={setModalOpenChangePassword} />
				<ModalPasswordRecovery ModalPasswordRecoveryOpen={modalPasswordRecovery} setModalPasswordRecoveryOpen={setModalOpenPasswordRecovery} />
			</Stack>
		</Toolbar>
	);
};

const Header = () => {
	const headerState = useSelector((state) => state.header);

	const sx =
		headerState === HEADER_FIXED
			? {
				position: "fixed",
				backgroundColor: "transparent",
			}
			: null;

	return (
		<AppBar sx={sx}>
			<Bar />
			<Navbar />
		</AppBar>
	);
};

export default Header;
