import { Button, Input, Modal, Popconfirm, Select } from "antd";
import { Table } from "src/custom/Components/Table";
import { useState, useEffect } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link } from "react-router-dom";
import { KE_HOACH_CHINH_LY_INPUT, KE_HOACH_CHINH_LY_FIELD_TABLE } from "src/storage/BienMucChinhLy";
import { useSelector } from "react-redux";
import { ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";
const API_PLAN = import.meta.env.VITE_API_PLAN;

const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;
const API_PLAN_BY_ID = import.meta.env.VITE_API_GET_PLAN_BY_TYPE;

import UserAPIService from "src/service/api/userAPIService";


const Create = ({ modalOpen, setModelOpen, reFetchData }) => {
	const [request, setRequest] = useState({});
	const [organName, setOrganName] = useState(null);


	useEffect(() => {
		const getOrgan = async () => {
			const organ = await UserAPIService.getUserOrgan();
			setOrganName(organ.name);
			handleChangeRequest('organ', organ.id);

		};
		getOrgan();
	}, []);

	const handleOk = async () => {
		request["state"] = ENUM_STATE_PLAN.CHAP_NHAN;
		request["type"] = ENUM_TYPE_PLAN.BIEN_MUC_CHINH_LY;

		await axiosHttpService.post(`${API_PLAN}`, request),
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			}
		};
		setTimeout(() => {
			reFetchData();
			setRequest({});
			setModelOpen(false);
		}, 500);
	};

	const handleCancel = () => {
		setModelOpen(false);
	};

	const handleChangeRequest = (name, value) => {
		setRequest({
			...request,
			[name]: value,
		});
	};

	return (
		<Modal
			title="Tạo mới"
			style={{
				top: 20,
			}}
			open={modalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<div>
				{KE_HOACH_CHINH_LY_INPUT.map((item, index) => {
					return (
						<div key={index}>
							{
								<div className="flex justify-between py-[12px]">
									<span>{item.label}</span>
									<Input
										name={item.name}
										onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
										type={item.type}
										className="w-[70%]"
										value={item.name === 'organ' ? organName : request[item.name]}
										disabled={item.disabled}
									/>
								</div>
							}
						</div>
					);
				})}
			</div>
		</Modal>
	);
};

const Delete = ({ id, reFetchData }) => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirm = async () => {
		const deletePlan = async () => {
			await axiosHttpService.delete(API_PLAN + '/' + id);
		};

		deletePlan();
		setTimeout(() => {
			reFetchData();
			setOpen(false);
		}, 500);
	};

	useEffect(() => {
		const popupContainer = document.querySelectorAll(
			".ant-popover.ant-popconfirm.css-dev-only-do-not-override-1fviqcj.css-dev-only-do-not-override-1fviqcj.ant-popover-placement-top"
		)[0];

		if (popupContainer === undefined) return;

		const buttonAccepts = document.querySelectorAll(
			".ant-popconfirm-buttons > .ant-btn-primary"
		);
		buttonAccepts.forEach((buttonCancel) => {
			buttonCancel.textContent = "Xóa";
		});

		const buttonCancels = document.querySelectorAll(
			".ant-popconfirm-buttons > .ant-btn-default "
		);
		buttonCancels.forEach((buttonAccept) => {
			buttonAccept.textContent = "Hủy";
		});
	}, [open]);

	return (
		<Popconfirm
			title="Xóa"
			open={open}
			description="Bạn có chắc chắn xóa?"
			onConfirm={handleConfirm}
			onCancel={handleClose}
		>
			<Button
				className="border-none"
				onClick={() => {
					setOpen(true);
				}}
				title="Xóa"
			>
				<i className="fa-solid fa-trash-can"></i>
			</Button>
		</Popconfirm>
	);
};

const Update = ({ reFetchData, id }) => {
	const [request, setRequest] = useState({});
	const [modalOpen, setModalOpen] = useState(false);
	const [organ, setOrgan] = useState([]);
	const organId = useSelector((state) => state.organId.organId)

	const kehoachchinhlyOption = {
		organId: organId,
		organ: organ,
	}

	useEffect(() => {
		const getPlan = async () => {
			const { data } = await axiosHttpService.get(API_PLAN + '/' + id);
			setRequest({
				code: data.code,
				name: data.name,
				start_date: data.start_date,
				end_date: data.end_date,
				organ: data.organ,
				state: data.state,
			});
		};
		getPlan();
	}, [id]);

	useEffect(() => {
		const getOrgan = async () => {
			const response = await UserAPIService.getUserOrgan();
			let organObject = {
				value: response.id,
				label: response.name
			}
			setOrgan([organObject]);
		};

		getOrgan();
	}, []);

	const handleChangeRequest = (name, value) => {
		return setRequest({
			...request,
			[name]: value,
		});
	};

	const handleClick = () => {
		setModalOpen(true);
	};

	const handleOk = async () => {
		await axiosHttpService.put(API_PLAN + '/' + id, request);
		setModalOpen(false);
		reFetchData();
	};

	const handleCancle = () => {
		setModalOpen(false);
	};

	return (
		<div>
			<Button onClick={handleClick} className="border-none">
				<i className="fa-regular fa-pen-to-square"></i>
			</Button>
			<Modal
				open={modalOpen}
				title="Sửa"
				onOk={handleOk}
				onCancel={handleCancle}
			>
				<div>
					{KE_HOACH_CHINH_LY_INPUT.map((item, index) => {
						return (
							<div key={index}>
								{
									item.type === "select" ?
										<div className="flex justify-between py-[12px]">
											<span>{item.label}</span>
											{
												item.label === "Cơ quan / Đơn vị lập kế hoạch" ?
													<Select
														name="organ"
														className="w-[70%]"
														showSearch
														allowClear
														defaultValue={request.organ}
														optionFilterProp="children"
														onChange={(value) => handleChangeRequest('organ', value)}
														filterOption={(input, option) =>
															(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
														}
														options={organ}
														disabled={true}
													/>
													:
													<Select
														name={item.name}
														onChange={(value) => handleChangeRequest(item.name, value)}
														className="w-[70%]"
														value={request[item.name]}
														options={kehoachchinhlyOption[item.name]}
													/>}
										</div>
										:
										<div className="flex justify-between py-[12px]">
											<span>{item.label}</span>
											<Input
												name={item.name}
												onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
												type={item.type}
												className="w-[70%]"
												value={request[item.name]}
											/>
										</div>
								}
							</div>
						);
					})}
				</div>
			</Modal>
		</div>
	);
};

const KeHoachChinhLy = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [plan, setPlan] = useState([]);

	const BUTTON_ACTIONS = [
		{
			title: "Tìm kiếm",
			btn_class_name: "custom-btn-search",
			icon: <i className="fa-solid fa-magnifying-glass"></i>,
		},
		{
			title: "Tạo kế hoạch",
			btn_class_name: "custom-btn-add-file",
			icon: <i className="fa-solid fa-plus"></i>,
			onClick: () => {
				setModalOpen(true);
			},
		},

	];

	const reFetchData = async () => {
		setIsLoading(true);
		const res = await axiosHttpService.get(`${API_PLAN_BY_ID + '/' + 2}`);
		const rawDatas = res.data.reverse();
		const plan = [];
		for (const rawData of rawDatas) {
			const row = {
				id: rawData.id,
				name: rawData.name,
				start_date: rawData.start_date,
				end_date: rawData.end_date,
				organ: rawData.organ_name,
				function: (
					<div className="flex ">
						<Delete id={rawData.id} reFetchData={reFetchData} />
						<Update id={rawData.id} reFetchData={reFetchData} />
					</div>
				),
			};
			plan.push(row);
		}
		setPlan(plan);
		setIsLoading(false);
	};

	useEffect(() => {
		reFetchData();
	}, []);

	return (
		<div className="w-full">
			<div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
				<p className="text-[14px] font-300 cursor-pointer ">
					<span className="text-[rgba(0,0,0,.45)]">
						<Link to="/bien-muc-chinh-ly/ke-hoach-chinh-ly">
							Biên mục chỉnh lý /{" "}
						</Link>
					</span>
					<span>
						<Link to="/bien-muc-chinh-ly/ke-hoach-chinh-ly">
							Kế hoạch chỉnh lý
						</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
				<p className="text-[20px] font-bold ">Kế hoạch chỉnh lý </p>
			</div>

			<div className="mt-[16px] mx-[24px] flex ">
				<div className="w-[11.11111%] px-[5px]">
					<Input
						allowClear
						name="title"
						placeholder="Tìm kiếm tên kế hoạch"
						className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px] flex items-center"
					></Input>
				</div>
				<div className="w-[11.11111%] px-[5px]">
					<Input
						name="start_date"
						placeholder="Năm"
						type="text"
						onBlur={(e) => (e.target.type = "text")}
						className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
					></Input>
				</div>
				<div className="w-[11.11111%] px-[5px]">
					<Input
						name="end_date"
						placeholder="Cơ quan đơn vị"
						type="text"
						onBlur={(e) => (e.target.type = "text")}
						className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
					></Input>
				</div>
				{BUTTON_ACTIONS.map((item, index) => {
					return (
						<div
							key={index}
							className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex"
						>
							<Button
								onClick={item.onClick}
								className={`rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] text-white items-center ${item.btn_class_name}`}
							>
								<div className="mr-[8px]">{item.icon}</div>
								{item.title}
							</Button>
						</div>
					);
				})}
			</div>

			<Table
				fieldNames={KE_HOACH_CHINH_LY_FIELD_TABLE}
				fieldDatas={plan}
				isLoading={isLoading}
			/>

			<Create
				modalOpen={modalOpen}
				setModelOpen={setModalOpen}
				reFetchData={reFetchData}
			/>
		</div>
	);
};

export default KeHoachChinhLy;
