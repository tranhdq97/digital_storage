import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Modal, Input, Select } from "antd"
import { Typography } from "@mui/material"
import * as userAction from '../../../actions/user'
import { GetKey } from "../../../custom/Function"
import { PopupConfirm } from "src/custom/Components"

const USER_ROLES = ["Nhân viên nhập liệu", "Người duyệt đơn"]
const userName = {
    0: "Admin",
    1: "Cường",
    2: "Lương",
    3: "Hiếu"
}


const ModalPasswordRecovery = ({ ModalPasswordRecoveryOpen, setModalPasswordRecoveryOpen }) => {
	const [request, setRequest] = useState({});



	const handleOk = async () => {
		setTimeout(() => {
			setRequest({});
			setModalPasswordRecoveryOpen(false);
		}, 500);
	};

	const handleCancle = () => {
		setModalPasswordRecoveryOpen(false);
	};

	return (
		<Modal
			title="Lấy lại mật khẩu"
			style={{
				top: 20,
			}}
			open={ModalPasswordRecoveryOpen}
			onOk={handleOk}
			onCancel={handleCancle}
		>
			<div>
                <div className="flex justify-between py-[12px]">
                    <span>
                        <Typography fontSize={"15px"}>Cảm ơn bạn đã nhấn vào đường link khôi phục mật khẩu từ email!</Typography>
                        </span>
                    </div>
                <div className="flex justify-between py-[12px]">
					<span>Mật khẩu mới</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="password"
						className="w-[70%]"
						value={request["name"]}
					/>
				</div><div className="flex justify-between py-[12px]">
					<span>Nhập lại mật khẩu mới</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="password"
						className="w-[70%]"
						value={request["name"]}
					/>
				</div>
			</div>
		</Modal>
	);
};

const ModalChangePassword = ({ ModalChangePasswordOpen, setModalChangePasswordOpen }) => {
	const [request, setRequest] = useState({});



	const handleOk = async () => {
		setTimeout(() => {
			setRequest({});
			setModalChangePasswordOpen(false);
		}, 500);
	};

	const handleCancle = () => {
		setModalChangePasswordOpen(false);
	};

	return (
		<Modal
			title="Thay đổi mật khẩu"
			style={{
				top: 20,
			}}
			open={ModalChangePasswordOpen}
			onOk={handleOk}
			onCancel={handleCancle}
		>
			<div>
				<div className="flex justify-between py-[12px]">
					<span>Mật khẩu cũ</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="password"
						className="w-[70%]"
						value={request["name"]}
					/>
				</div>
                <div className="flex justify-between py-[12px]">
					<span>Mật khẩu mới</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="password"
						className="w-[70%]"
						value={request["name"]}
					/>
				</div><div className="flex justify-between py-[12px]">
					<span>Nhập lại mật khẩu mới</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="password"
						className="w-[70%]"
						value={request["name"]}
					/>
				</div>
			</div>
		</Modal>
	);
};

const ModalChangeInfo = ({ modalOpen, setModalOpen }) => {
	const [request, setRequest] = useState({});




	const handleOk = async () => {
		setTimeout(() => {
			setRequest({});
			setModalOpen(false);
		}, 500);
	};

	const handleCancle = () => {
		setModalOpen(false);
	};

	return (
		<Modal
			title="Thay đổi thông tin cá nhân"
			style={{
				top: 20,
			}}
			open={modalOpen}
			onOk={handleOk}
			onCancel={handleCancle}
		>
			<div>
				<div className="flex justify-between py-[12px]">
					<span>Họ và tên</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="text"
						className="w-[70%]"
						value={request["name"]}
					/>
				</div>

				<div className="flex justify-between py-[12px]">
					<span>Ngày tháng năm sinh</span>
					<Input
						name="date"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="date"
						className="w-[70%]"
						value={request["date"]}
					/>
				</div>

				<div className="flex justify-between py-[12px]">
					<span>Cơ quan</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="text"
						className="w-[70%]"
						value={request["name"]}
					/>
				</div>
			</div>
		</Modal>
	);
};

const Header = ({ sideBarWidth, setSideBarWidth }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [ModalChangePasswordOpen, setModalChangePasswordOpen] = useState(false);
    const [ModalPasswordRecoveryOpen, setModalPasswordRecoveryOpen] = useState(false);
    const dispatch = useDispatch()
    const userRole = useSelector(state => state.user.role)
    const p = useSelector(state => state.userPermission)
    const userID = localStorage.getItem("userID")
    const [stateBoxUserRole, setStateBoxUserRole] = useState(false)
    const username = useSelector(state => state.authen.username);
    const handleLogOut = () =>{
        dispatch({type: "LOGOUT"})
    }

    const handleOpenChangeInfoModal = () => {
        setModalOpen(true)
    }

    const handleOpenChangePassword = () => {
        setModalChangePasswordOpen(true)
    }

    const handleOpenPasswordRecovery = () => {
        setModalPasswordRecoveryOpen(true)
    }

    return (
        <>

            <ModalChangeInfo modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <ModalChangePassword ModalChangePasswordOpen={ModalChangePasswordOpen} setModalChangePasswordOpen={setModalChangePasswordOpen} />
            <ModalPasswordRecovery ModalPasswordRecoveryOpen={ModalPasswordRecoveryOpen} setModalPasswordRecoveryOpen={setModalPasswordRecoveryOpen} />

            <div className={`z-50 flex justify-between px-[16px] transition-all ${sideBarWidth === 250 ? "ml-[290px] w-[calc(99%-285px)]" : "ml-[90px] w-[calc(99%-85px)]"} h-[75px]  mt-[8px] border-[2px] border-blue-700 rounded-md bg-blue-300 top-0`}>
                <div className="flex justify-between items-center">
                    <button className="mr-[20px] text-[25px] font-bold text-black cursor-pointer toggle-side-bar-button" onClick={() => {
                        sideBarWidth === 250 ? setSideBarWidth(50) : setSideBarWidth(250)
                    }}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <p className="font-bold text-black text-[16px]">ISTORAGE - HỆ THỐNG QUẢN LÝ TÀI LIỆU LƯU TRỮ ĐIỆN TỬ TỈNH QUẢNG NGÃI</p>
                </div>
                <div onClick={() => setStateBoxUserRole(!stateBoxUserRole)} className="flex justify-between items-center cursor-pointer relative select-none min-w-[150px]">
                    <div className="mr-[8px] flex items-center rounded-[50%] justify-center w-[36px] h-[36px] bg-lime-100 border-amber-500 border-[0.5px] text-black">
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <p className="text-black font-medium w-[calc(100%-36px)] text-center">
                        {username}
                    </p>

                    {
                        stateBoxUserRole &&
                        <div className="absolute top-[50px] w-[calc(100%-36px)]">

                            <div onClick={handleOpenChangeInfoModal} className="text-center w-full font-medium text-black bg-white rounded-[8px] p-[8px] text-[12px] cursor-pointer border-solid border-[1px] border-[#ccc] shadow-sm ml-[36px] hover:bg-blue-700 hover:text-white">
                                Thông tin cá nhân
                            </div>

                            <div onClick={handleOpenChangePassword} className="text-center w-full font-medium text-black bg-white rounded-[8px] p-[8px] text-[12px] cursor-pointer border-solid border-[1px] border-[#ccc] shadow-sm ml-[36px] hover:bg-blue-700 hover:text-white">Đổi mật khẩu</div>


                            <div onClick={handleOpenPasswordRecovery} className="text-center w-full font-medium text-black bg-white rounded-[8px] p-[8px] text-[12px] cursor-pointer border-solid border-[1px] border-[#ccc] shadow-sm ml-[36px] hover:bg-blue-700 hover:text-white">Lấy lại mật khẩu</div>

                            <div onClick={handleLogOut} className="text-center w-full font-medium text-black bg-white rounded-[8px] p-[8px] text-[12px] cursor-pointer border-solid border-[1px] border-[#ccc] shadow-sm ml-[36px] hover:bg-blue-700 hover:text-white">Đăng xuất</div>

                        </div>

                    }
                </div>
            </div>
        </>
    )
}

export default Header
