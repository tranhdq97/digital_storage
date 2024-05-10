import { Button, Input, Modal, Popconfirm, Select, Upload } from "antd";
import { Table } from "src/custom/Components/Table";
import { useState, useEffect } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link } from "react-router-dom";
import { ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";

import UserAPIService from "src/service/api/userAPIService";
const API_PLAN = import.meta.env.VITE_API_PLAN;

const API_PLAN_BY_TYPE = import.meta.env.VITE_API_GET_PLAN_BY_TYPE;
const API_COLLECTION_PLAN = import.meta.env.VITE_API_PLAN;
const API_STORAGE_GET_ORGAN_ALL =
	import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;
const API_GET_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN;
const FIELDS_TABLE = [
	{ title: "Tên kế hoạch", key: "name", width: "150%" },
	{ title: "Ngày kế hoạch", key: "start_date", width: "100%" },
	{ title: "Cơ quan / Đơn vị lập kế hoạch", key: "organ", width: "100%" },
	{ title: "Trạng thái", key: "state", width: "70%" },
	{ title: "Chức năng", key: "function", width: "120px" },
];

const Create = ({ modalOpen, setModelOpen, reFetchData }) => {
	const [request, setRequest] = useState({});
	const [organ, setOrgan] = useState([]);
	const [fileList, setFileList] = useState([]);
	const [fileUploaded, setFileUploaded] = useState([]);
	const props = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
	};
	useEffect(() => {
		const getOrgan = async () => {
			const { data } = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL);
			const _ = data.map((item) => {
				return {
					label: item.name,
					value: item.id,
				};
			});
			setOrgan(_);
		};

		getOrgan();
	}, []);

	const handleOk = async () => {
		console.log(fileUploaded);
		const formData = new FormData();
		fileList.forEach((file) => {
			console.log(file);
			formData.append('files', file);
		});
		request["state"] = ENUM_STATE_PLAN.TAO_MOI;
		request["attachment"] = fileUploaded[0];
		request["type"] = ENUM_TYPE_PLAN.THU_THAP_NOP_LUU;

		await axiosHttpService.post(`${API_PLAN}`, request, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			}
		});
		setTimeout(() => {
			reFetchData();
			setRequest({});
			setModelOpen(false);
		}, 500);
	};

	const handleCancle = () => {
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
			onCancel={handleCancle}
		>
			<div>
				<div className="flex justify-between py-[12px]">
					<span>Tên kế hoạch</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="text"
						className="w-[70%]"
						value={request["name"]}
					/>
				</div>

				<div className="flex justify-between py-[12px]">
					<span>Ngày kế hoạch</span>
					<Input
						name="start_date"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="date"
						className="w-[70%]"
						value={request["date"]}
					/>
				</div>

				<div className="flex justify-between py-[12px]">
					<span>Cơ quan / Đơn vị </span>
					<Select
						name="organ"
						onChange={(value) => handleChangeRequest("organ", value)}
						className="w-[70%]"
						value={request["organ"]}
						options={organ}
					/>
				</div>


				<div className="flex justify-between py-[12px]">
					<span>Văn bản đính kèm</span>
					<form encType="multipart/form-data">
						<label
							className="flex justify-center items-center cursor-pointer h-[30px] border-[#ccc] border-2 rounded-[5px] text-black hover:opacity-90 text-[12px] w-[100px]"
							htmlFor="file-upload"
						>
							<p className="ml-[8px]">Thêm văn bản</p>
						</label>
						<input
							onClick={(ev) => {
								ev.target.value = "";
							}}
							type="file"
							id="file-upload"
							name="file-upload"
							className="hidden"
							onChange={(ev) => {
								setFileUploaded(Array.from(ev.target.files));
							}}
							accept="application/pdf"
							multiple
						></input>
					</form>
				</div>
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

const Update = ({
	reFetchData,
	id,
	modalOpen,
	setModalOpen }) => {
	const [request, setRequest] = useState({});

	const [fileList, setFileList] = useState([]);
	const props = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
	};

	useEffect(() => {
		if (!id) return;
		const getPlan = async () => {
			const { data } = await axiosHttpService.get(API_PLAN + '/' + id);
			setRequest({
				name: data.name,
				date: data.start_date,
				organ: data.organ,
				state: data.state,
			});
		};
		getPlan();
	}, [id]);
	const [organ, setOrgan] = useState([]);

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

			<Modal
				open={modalOpen}
				title="Sửa"
				onOk={handleOk}
				onCancel={handleCancle}
			>
				<div className="flex justify-between items-center">
					<span>Tên kế hoạch</span>
					<Input
						name="name"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						className="w-[70%]"
						value={request["name"]}
					/>
				</div>
				<div className="flex justify-between py-[12px]">
					<span>Ngày kế hoạch</span>
					<Input
						name="date"
						onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
						type="date"
						className="w-[70%]"
						value={request["date"]}
					/>
				</div>
				<div className="flex justify-between py-[12px]">
					<span>Cơ quan / Đơn vị </span>
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
					/>
				</div>

				<div className="flex justify-between py-[12px]">
					<span>Văn bản đính kèm</span>
					<Upload
						{...props}
						className="w-[70%]"
						name="file"
					>
						<Button>Tải tệp lên</Button>
					</Upload>
				</div>
			</Modal>
		</div>
	);
};

const KeHoachThuThap = () => {
	const [id, setId] = useState(null);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [stateCheckBox, setStateCheckBox] = useState([]);
	const [plan, setPlan] = useState([]);
	const handleSendCollectPlan = async () => {
		const planIds = stateCheckBox.map((item) => {
			return Number(item.split("checkbox")[1]);
		})

		plan.forEach(async (pl) => {
			if (planIds.findIndex((id) => id === pl.id) === -1) return;
			await axiosHttpService.put(API_COLLECTION_PLAN + '/' + pl.id, {
				name: pl.name.props.children[1],
				start_date: pl.start_date,
				organ: pl.organId,
				state: ENUM_STATE_PLAN.CHO_DUYET,
			});
		});

		setTimeout(() => {
			reFetchData();
		}, 600);
	}

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
		{
			title: "Gửi kế hoạch",
			btn_class_name: "custom-btn-clear-filter",
			onClick: handleSendCollectPlan,
			icon: <i className="fa-solid fa-sync"></i>,
		},
	];

	const handleClickUpdate = (id) => {
		setUpdateOpen(true);
		setId(id);
	}

	const reFetchData = async () => {
		setIsLoading(true);
		const res = await axiosHttpService.get(`${API_PLAN_BY_TYPE + '/' + 1}`);
		const rawDatas = res.data.reverse().filter((data) => {
			return data.state === ENUM_STATE_PLAN.TAO_MOI;
		});

		const plan = [];
		for (const rawData of rawDatas) {
			const organ = await axiosHttpService.get(API_GET_ORGAN + '/' + rawData.organ);
			const row = {
				id: rawData.id,
				name: <p
					onClick={() => handleClickUpdate(rawData.id)}
					className="cursor-pointer hover:underline"
				> {rawData.name} </p>,
				start_date: rawData.start_date,
				organ: rawData.organ_name,
				state: <button>{rawData.state}</button>,
				function: (
					<div className="flex ">
						<Delete id={rawData.id} reFetchData={reFetchData} />
						<Button onClick={() => handleClickUpdate(rawData.id)} className="border-none">
							<i className="fa-regular fa-pen-to-square"></i>
						</Button>

					</div>
				)
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
						<Link to="/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap">
							Thu thập và nộp lưu /{" "}
						</Link>
					</span>
					<span>
						<Link to="/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap">
							Kế hoạch thu thập
						</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
				<p className="text-[20px] font-bold ">Kế hoạch thu thập</p>
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
				setStateCheckBox={setStateCheckBox}
				fieldNames={FIELDS_TABLE}
				fieldDatas={plan}
				isLoading={isLoading}
				isCheckBox={true}
			/>

			<Create
				modalOpen={modalOpen}
				setModelOpen={setModalOpen}
				reFetchData={reFetchData}
			/>

			<Update
				id={id}
				reFetchData={reFetchData}
				modalOpen={updateOpen}
				setModalOpen={setUpdateOpen}
			/>
		</div>
	);
};

export default KeHoachThuThap;
