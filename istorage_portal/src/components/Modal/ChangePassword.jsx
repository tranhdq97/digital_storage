import { Modal, Input, Select } from "antd"
import { useState } from "react";
import { Typography } from "@mui/material"

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
				top: 200,
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

export default ModalChangePassword;
