import { Button, Input, Modal, Popconfirm, Select, Upload } from "antd";
import { Table } from "src/custom/Components/Table";
import { useState, useEffect, useRef } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link } from "react-router-dom";
import { ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";
import { useDispatch } from "react-redux";
import { ModalPlan } from "../Modals";
const API_COLLECTION_PLAN = import.meta.env.VITE_API_PLAN;
const API_STORAGE_GET_ORGAN_ALL =
	import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;

const FIELDS_TABLE = [
	{ title: "Tên kế hoạch", key: "name", width: "150%" },
	{ title: "Ngày kế hoạch", key: "date", width: "100%" },
	{ title: "Cơ quan / Đơn vị lập kế hoạch", key: "organ", width: "100%" },
	{ title: "Trạng thái", key: "state", width: "70%" },
	{ title: "Chức năng", key: "function", width: "120px" },
];

const Create = ({ modalOpen, setModelOpen, reFetchData }) => {
	const [request, setRequest] = useState({});
	const [organ, setOrgan] = useState([]);
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
		const getOrgan = async () => {
			const { data } = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL);
			const _ = data.map((item) => {
				return {
					label: item.name,
					value: item.name,
				};
			});
			setOrgan(_);
		};

		getOrgan();
	}, []);

	const handleOk = async () => {
		const formData = new FormData();
		fileList.forEach((file) => {
			formData.append('files[]', file);
		});
		request["state"] = ENUM_STATE_PLAN.TAO_MOI;
		request["files"] = formData;
		request["type"] = ENUM_TYPE_PLAN.THU_THAP_NOP_LUU;

		await axiosHttpService.post(`${API_COLLECTION_PLAN}`, request);
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
						onChange={(value) => handleChangeRequest("organ", value)}
						className="w-[70%]"
						value={request["organ"]}
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
			</div>
		</Modal>
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
		if (id === null) return;
		const getPlan = async () => {
			const { data } = await axiosHttpService.get(API_COLLECTION_PLAN + '/' + id);
			console.log(data);
			setRequest({
				name: data.name,
				date: data.date,
				organ: data.organ,
				state: data.state,
			});
		};
		getPlan();
	}, [id]);
	const [organ, setOrgan] = useState([]);

	useEffect(() => {
		const getOrgan = async () => {
			const { data } = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL);
			const _ = data.map((item) => {
				return {
					label: item.name,
					value: item.name,
				};
			});
			setOrgan(_);
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
		await axiosHttpService.put(API_COLLECTION_PLAN + '/' + id, request);
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
						onChange={(value) => handleChangeRequest("organ", value)}
						className="w-[70%]"
						value={request["organ"]}
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

const PheDuyetKeHoachThuThap = () => {
	const [id, setId] = useState(null);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [plan, setPlan] = useState([]);
	const dispatch = useDispatch();
	const ref = useRef();
	const reFetchData = async () => {
		setIsLoading(true);
		const res = await axiosHttpService.get(`${API_COLLECTION_PLAN}`);

		const rawDatas = res.data.reverse().filter((data) => {
			return data.state === ENUM_STATE_PLAN.CHO_DUYET;
		});

		const plan = [];
		for (const rawData of rawDatas) {
			const row = {
				id: rawData.id,
				name: <p
					onClick={() => handleClickUpdate(rawData.id)}
					className="cursor-pointer hover:underline"
				> {rawData.name} </p>,
				date: rawData.start_date,
				organ: rawData.organ_name,
				state: <button>{rawData.state}</button>,
				function: (
					<Button className="border-none shadow-none text-green-500"
						onClick={() => handleClickActionPlan(rawData.id)}
					>
						<i className="text-[20px] fa-regular fa-square-check"></i>
					</Button>
				),
			};
			plan.push(row);
		}
		ref.current = rawDatas;
		setPlan(plan);
		setIsLoading(false);
	};



	const handleClickActionPlan = async (id) => {
		const oldState = ref.current.find((item) => Number(item.id) === id);
		dispatch({
			oldState,
			type: "open_modal_collect_plan",
			id,
			reFetchData: reFetchData
		})
	}

	const BUTTON_ACTIONS = [
		{
			title: "Tìm kiếm",
			btn_class_name: "custom-btn-search",
			icon: <i className="fa-solid fa-magnifying-glass"></i>,
		}
	];

	const handleClickUpdate = (id) => {
		setUpdateOpen(true);
		setId(id);
	}



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
							Phê duyệt kế hoạch thu thập
						</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
				<p className="text-[20px] font-bold ">Phê duyệt kế hoạch thu thập</p>
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
				fieldNames={FIELDS_TABLE}
				fieldDatas={plan}
				isLoading={isLoading}
			/>
			<Update
				id={id}
				reFetchData={reFetchData}
				modalOpen={updateOpen}
				setModalOpen={setUpdateOpen}
			/>
			<ModalPlan />
		</div>
	);
};

export default PheDuyetKeHoachThuThap;
