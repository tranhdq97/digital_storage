import { Modal, Input, Select } from "antd"
import { useState } from "react";
import { Typography } from "@mui/material"
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
				top: 200,
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

export default ModalChangeInfo;
