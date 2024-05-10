import { Modal, Input, Select } from "antd"
import { useState } from "react";
import { Typography } from "@mui/material"

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
				top: 200,
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

export default ModalPasswordRecovery;
