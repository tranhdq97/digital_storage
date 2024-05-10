/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, cloneElement } from "react";
import DocCategory from "../components/Form/Document/DocCategory";
import MultimediaCategory from "../components/Form/Multimedia/MultimediaCategory";
import axiosHttpService, { axiosCorsService } from "src/utils/httpService";
import { Table } from "../custom/Components";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input, Select, Popconfirm, Modal } from "antd";
import { OpenFile, EditFile, CreateFile } from "../actions/formFile";
import File from "../components/Form/File/File";
import { FIELDS_TABLE } from "../storage/FileStorage";
import { ENUM_STATE_BMCL, ENUM_STATE_FILE, ENUM_STATE_PLAN, STATE } from "../storage/Storage";
import { DeleteData, GetKey } from "../custom/Function";
import { useButtonClickOutside } from "../custom/Hook";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../custom/Function";
import { ModalCensorship, ModalConfirmLuuTruCoQuan, ModalModificationDocumentAddDocument, ModalModificationDocumentAddedDocument, ModalModificationDocumentConfirmStore, ModalModificationDocumentRequireAddDoc, ModalRecoverFile } from "./Modals";


import UserAPIService from "src/service/api/userAPIService";
import FileAPIService from "src/service/api/FileAPIService";
import PlanAPIService from "src/service/api/PlanAPIService";
import SoNoiVuPheDuyet from "./LuuTruLichSu/SoNoiVuPheDuyet";
// import ExcelAPIService from "src/service/api/execAPIService";
const API_GOV_FILE_GET_ALL = import.meta.env.VITE_API_GOV_FILE_GET_ALL;
const API_UPDATE_STATE_GOV_FILE =
	import.meta.env.VITE_API_GOV_FILE_UPDATE_STATE;
const API_GOV_FILE_SEARCH = import.meta.env.VITE_API_GOV_FILE_GET_ALL;
const API_GOV_FILE_DELETE = import.meta.env.VITE_API_GOV_FILE_DELETE;
const API_STORAGE_DELETE_FILE_ORGAN_STORAGE =
	import.meta.env.VITE_API_STORAGE_DELETE_FILE_ORGAN_STORAGE;
const API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL =
	import.meta.env.VITE_API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL;

const API_GET_CATEGORY_FILE_BY_ORGAN = import.meta.env.VITE_API_GET_CATEGORY_FILE_BY_ORGAN;
const API_COLLECTION_PLAN = import.meta.env.VITE_API_COLLECTION_PLAN;
const API_EXPORT_EXCEL = import.meta.env.VITE_API_EXPORT_EXCEL;

const PlanAndCategoryFile = ({
	open,
	setOpen,
	API_PLAN,
	filtePlanCondition
}) => {
	const dispatch = useDispatch();
	const [categoryFile, setCategoryFile] = useState([]);
	const [collectionPlan, setCollectionPlan] = useState([]);
	const [category, setCategory] = useState(null);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const handleOk = () => {
		setOpen(false);
		dispatch(CreateFile(category, selectedPlan));
	};

	const handleCancel = () => {
		setOpen(false);
	};

	useEffect(() => {
		const getCategoryFile = async () => {
			const response = await UserAPIService.getUserOrgan();
			let organObject = {
				value: response.id,
				label: response.name
			}
			const { data } = await axiosHttpService.get(API_GET_CATEGORY_FILE_BY_ORGAN + '/' + organObject.value);
			const _ = [];
			for (let i = 0; i < data.length; i++) {
				_.push({
					label: data[i].name,
					value: data[i].id,
				});
			}
			setCategoryFile(_);
		};

		const getCollectionPlan = async () => {
			const { data } = await axiosHttpService.get(API_PLAN);
			const organ = await UserAPIService.getUserOrgan();
			const filterdData = data.filter((item) => {
				return filtePlanCondition(item);
			}).filter((plan) => {
				return plan.organ == organ.id;
			});

			const _ = filterdData.map((item) => {
				return {
					value: item.id,
					label: item.name,
				};
			});
			setCollectionPlan(_);
		};

		getCategoryFile();
		getCollectionPlan();
	}, []);

	return (
		<Modal
			title="Chọn danh mục và kế hoạch"
			style={{
				top: 20,
			}}
			okButtonProps={{ style: { backgroundColor: 'blue-300' } }}
			className="w-[600px]"
			open={open}
			onCancel={handleCancel}
			onOk={handleOk}
		>
			<div className="flex justify-between py-[12px]">
				<span>Kế hoạch </span>
				<Select
					name="collectionPlan"
					className="w-[70%]"
					options={collectionPlan}
					onChange={(value) => setSelectedPlan(value)}
				/>
			</div>
			<div className="flex justify-between py-[12px]">
				<span>Danh mục</span>
				<Select
					name="categoryFile"
					className="w-[70%]"
					options={categoryFile}
					onChange={(value) => setCategory(value)}
				/>
			</div>
		</Modal>
	);
};

const ButtonFunctionOfEachFile = ({
	handleClickOnFile,
	IDFile,
	reset,
	state,
}) => {
	const userPermissionId = useSelector((state) => state.user.permission_id);
	const handleClose = () => {
		setOpen(false);
	};
	const handleConfirm = () => {
		const DeleteOrganFile = async () => {
			const files = axiosHttpService.get(API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL);
			for (const file of files) {
				if (file.file_id === IDFile) {
					await axiosHttpService.delete(API_STORAGE_DELETE_FILE_ORGAN_STORAGE + file.id);
				}
			}
		};

		DeleteData(
			API_GOV_FILE_DELETE,
			{ id: IDFile, perm_token: userPermissionId },
			"Xóa thành công"
		);
		DeleteOrganFile();
		setTimeout(async () => {
			await reset();
		}, 500);
		setOpen(false);
	};

	const [buttonRef, contentRef, toggleContent, showContent] =
		useButtonClickOutside(false, handleClose);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const handleClickUploadFile = () => {
		dispatch({ type: "open", id: IDFile });
		setTimeout(() => {
			document.getElementById("file-upload").click();
		}, 500);
	};

	useEffect(() => {
		const popupContainer = document.querySelectorAll(
			".ant-popover.ant-popconfirm.css-1vr7spz.css-1vr7spz.ant-popover-placement-top"
		)[0];

		if (popupContainer === undefined) return;

		contentRef.current[0] = popupContainer;

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

	const BUTTON_READ_ONLY = [
		{
			icon: <i className="fa-regular fa-folder-open"></i>,
			title: "Xem hồ sơ",
			color: "text-[#FF8400]",
			onclick: () => {
				dispatch(OpenFile(IDFile));
			},
		},
	];

	const BUTTON_DEFAULT = [
		{
			icon: <i className="fa-solid fa-upload"></i>,
			title: "Thêm văn bản",
			color: "text-[#537FE7]",
			onclick: () => {
				handleClickUploadFile();
			},
		},
		{
			icon: <i className="fa-solid fa-photo-film"></i>,
			title: "Thêm tài liệu đa phương tiện",
			color: "text-[#19376D]",
			onclick: () => { },
		},
		{
			icon: <i className="fa-regular fa-folder-open"></i>,
			title: "Sửa hồ sơ",
			color: "text-[#FF8400]",
			onclick: () => {
				dispatch(EditFile(IDFile));
			},
		},
	];

	const BUTTON_RECOVER = [
		{
			icon: <i className="fa-regular fa-folder-open"></i>,
			title: "Sửa hồ sơ",
			color: "text-[#FF8400]",
			onclick: () => {
				dispatch(EditFile(IDFile));
			},
		},
	];

	const BUTTON_MORE = [
		{
			popup: true,
			element: (
				<Popconfirm
					title="Xóa hồ sơ"
					open={open}
					description="Bạn có chắc chắn xóa?"
					onConfirm={handleConfirm}
					onCancel={handleClose}
					key={GetKey()}
				>
					<Button
						onClick={() => {
							setOpen(true);
						}}
						className={`hover:bg-blue-300 cursor-pointer basis-1/4 max-w-[25%] text-[#20262E] px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button`}
						title="Xóa hồ sơ"
					>
						<i className="fa-solid fa-trash-can"></i>
					</Button>
				</Popconfirm>
			),
		},

		{
			icon: <i className="fa-solid fa-clipboard-list"></i>,
			title: "Xem lịch sử",
			color: "text-[#FF8400]",
			onclick: () => { },
		},
		{
			icon: <i className="fa-solid fa-user-doctor"></i>,
			title: "Phân quyền",
			color: "text-[#0014FF]",
			onclick: () => { },
		},
	];

	return (
		<div>
			<div className="flex flex-wrap">
				{(state !== 1 && state !== 17 && state !== 7 && state !== 13 && state !== 11) ? (
					<div className="flex justify-center w-full">
						{BUTTON_READ_ONLY.map((item) => {
							return (
								<Button
									key={GetKey()}
									className={` hover:bg-blue-300 cursor-pointer basis-1/4 max-w-[25%] ${item.color} px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button`}
									onClick={item.onclick}
									title={item.title}
								>
									{item.icon}
								</Button>
							);
						})}
					</div>
				) : state === 17 ? (
					<div className="flex justify-center w-full">
						{BUTTON_RECOVER.map((item) => {
							return (
								<Button
									key={GetKey()}
									className={` hover:bg-blue-300 cursor-pointer basis-1/4 max-w-[25%] ${item.color} px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button`}
									onClick={item.onclick}
									title={item.title}
								>
									{item.icon}
								</Button>
							);
						})}
					</div>
				) : (
					<div className="flex justify-center">
						{BUTTON_DEFAULT.map((item) => {
							return (
								<Button
									key={GetKey()}
									className={` hover:bg-blue-300 cursor-pointer basis-1/4 max-w-[25%] ${item.color} px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button`}
									onClick={item.onclick}
									title={item.title}
								>
									{item.icon}
								</Button>
							);
						})}

						<div className="relative">
							<Button
								ref={buttonRef}
								onClick={toggleContent}
								className=" hover:bg-blue-300 px-[2px] text-[#000] cursor-pointer border-none text-center icon-button"
								title="Xem thêm"
							>
								<i className="fa-solid fa-ellipsis"></i>
							</Button>
							{showContent && (
								<div
									ref={(el) => {
										contentRef.current[1] = el;
									}}
									className="absolute right-[0] top-[-25px] flex justify-between"
								>
									{BUTTON_MORE.map((item) => {
										if (item.popup) return item.element;
										return (
											<Button
												key={GetKey()}
												className={`hover:bg-blue-300 cursor-pointer basis-1/4 max-w-[25%] ${item.color} px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button`}
												onClick={item.onclick}
												title={item.title}
											>
												{item.icon}
											</Button>
										);
									})}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const BasePage = ({
	parent,
	current,
	filter = null,
	addNewFile = false,
	newButtons = null,
	isCheckBox = true,
	buttonFuctions = null,
	fieldsTableCustom = null,
	showTable = true,
	apiPlan = API_COLLECTION_PLAN,
	eOffice = true,
	currentStateModal = ENUM_STATE_FILE.NOP_LUU_CO_QUAN,
	currentTab = null,
	haveActionButton = true,
	XepVaoKho = false,
	luuTruCoQuan = false,
	BMCL_GuiDuyetHoSo = false,
	filtePlanCondition = null,
	pheDuyetLuuTruLichSu = false,
	pheDuyetTieuHuy = false,
	khoiPhuc = false,
	duyetKhoiPhuc = false,
	excel = true,
	havePlan = true,
	soNoiVuDuyet = false,
}) => {
	const [plan, setPlan] = useState([]);
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState(false);
	const [fieldsTable, setFieldsTable] = useState(FIELDS_TABLE);
	const [files, setFiles] = useState([]);
	const [fileSheet, setFileSheet] = useState([]);
	const [doesFilter, setDoesFilter] = useState(true);
	const [stateMultimediaCategory, setStateMultimediaCategory] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [stateCheckBox, setStateCheckBox] = useState([]);
	const userPermissionId = useSelector((state) => state.user.permission_id);
	const userPermissions = useSelector((state) => state.user.permissions);
	const [filterByPlan, setFilterByPlan] = useState(null);
	const [buttonRef, contentRef, toggleContent, showContent] =
		useButtonClickOutside(false);

	const [search, setSearch] = useState({
		title: null,
		organ_id: null,
		offce: null,
		state: 0,
		type: null,
	});

	const handleClickOnFile = (IDFile) => {
		dispatch({ type: "open", id: IDFile });
	};

	const getFileFromResponse = (response) => {
		const rawDatas = response.data.reverse();
		setFileSheet(rawDatas);
		let filesArray = [];
		for (const rawData of rawDatas) {
			let newButton = null;

			if (buttonFuctions != null) {
				switch (currentStateModal) {
					case ENUM_STATE_FILE.NOP_LUU_CO_QUAN:
						newButton = cloneElement(buttonFuctions, {
							clickFunction: () => {
								dispatch({
									type: "open_modal_confirm_nopluucoquan",
									id: rawData.id,
									current_state: rawData.state,
								});
							},
						});
						break;
					case ENUM_STATE_FILE.LUU_TRU_CO_QUAN:
						newButton = cloneElement(buttonFuctions, {
							clickFunction: () => {
								dispatch({
									type: "open_modal_confirm_luutrucoquan",
									id: rawData.id,
								});
							},
						});
						break;
					case ENUM_STATE_BMCL.BMCL_PHE_DUYET_LUU_KHO:
						newButton = cloneElement(buttonFuctions, {
							clickFunction: () => {
								dispatch({
									type: "open_modal_confirm_bmcl_pheduyetluukho",
									id: rawData.id,
								});
							},
						});
						break;
					case ENUM_STATE_BMCL.BMCL_BO_SUNG_HO_SO_TAI_LIEU:
						newButton = cloneElement(buttonFuctions, {
							clickFunction: () => {
								dispatch({
									type: "open_modal_confirm_bmcl_bosunghosotailieu",
									id: rawData.id,
								});
							},
						});
						break;
					case ENUM_STATE_BMCL.BMCL_DA_BO_SUNG_TAI_LIEU:
						newButton = cloneElement(buttonFuctions, {
							clickFunction: () => {
								dispatch({
									type: "open_modal_confirm_bmcl_hosotailieudabosung",
									id: rawData.id,
								});
							},
						});
						break;
					case ENUM_STATE_BMCL.BMCL_YEU_CAU_BO_SUNG_TAI_LIEU_DA_LUU_KHO:
						newButton = cloneElement(buttonFuctions, {
							clickFunction: () => {
								dispatch({
									type: "open_modal_confirm_bmcl_yeucaubosunghosotailieudaluukho",
									id: rawData.id,
								});
							},
						});
						break;
				}

				// newButton = cloneElement(buttonFuctions, {
				// 	clickFunction: () => {
				// 		dispatch({
				// 			type: currentStateModal === ENUM_STATE.NOP_LUU_CO_QUAN ? "open_modal_confirm_nopluucoquan" : "open_modal_confirm_luutrucoquan",
				// 			id: rawData.id,
				// 			current_state: rawData.state,
				// 		});
				// 	},
				// });
			}

			let row = {};

			if (luuTruCoQuan) {
				row = {
					id: rawData.id,
					gov_file_code: (
						<p
							className="cursor-pointer hover:underline"
							onClick={() => handleClickOnFile(rawData.id)}
						>
							{rawData.gov_file_code || ""}
						</p>
					),
					title: (
						<p
							className="cursor-pointer hover:underline"
							onClick={() => handleClickOnFile(rawData.id)}
						>
							{rawData.title || ""}
						</p>
					),
					organ_id_name: rawData.organ_id_name || "",
					drawer_name: rawData.drawer_name || "",
					endDate: rawData.end_date,
					maintenance_name: rawData.maintenance_name || "",
					rights: rawData.rights || "",
					state: (
						<button
							onClick={() => {
								search["state"] = rawData.state;
								handleSearch();
							}}
						>
							{STATE[rawData.state]}
						</button>
					),
					Function: newButton || (
						<ButtonFunctionOfEachFile
							state={parseInt(rawData.state)}
							handleClickOnFile={handleClickOnFile}
							IDFile={rawData.id}
							reset={reset}
						/>
					),
				}
			} else {
				row = {
					id: rawData.id,
					gov_file_code: (
						<p
							className="cursor-pointer hover:underline"
							onClick={() => handleClickOnFile(rawData.id)}
						>
							{rawData.gov_file_code || ""}
						</p>
					),
					title: (
						<p
							className="cursor-pointer hover:underline"
							onClick={() => handleClickOnFile(rawData.id)}
						>
							{rawData.title || ""}
						</p>
					),
					organ_id_name: rawData.organ_id_name || "",
					sheet_number: rawData.sheet_number || "",
					total_doc: rawData.total_doc || "",
					start_date: rawData.start_date || "",
					end_date: rawData.end_date || "",
					maintenance_name: rawData.maintenance_name || "",
					rights: rawData.rights || "",
					state: (
						<button
							onClick={() => {
								search["state"] = rawData.state;
								handleSearch();
							}}
						>
							{STATE[rawData.state]}
						</button>
					),
					Function: newButton || (
						<ButtonFunctionOfEachFile
							state={parseInt(rawData.state)}
							handleClickOnFile={handleClickOnFile}
							IDFile={rawData.id}
							reset={reset}
						/>
					),
				}
			}
			filesArray.push(row);
		}
		return filesArray;
	};

	const resetSearch = async () => {
		let request = API_GOV_FILE_SEARCH;
		const response = await axiosHttpService.get(request);
		setFiles(getFileFromResponse(response));
		setDoesFilter(true);
		setSearch((prev) => ({
			title: "",
			organ_id: "",
			offce: "",
			state: 0,
			type: "",
			end_date: "",
			start_date: "",
		}));
	};

	const reset = () => {
		const fetchFileData = async () => {
			try {
				setIsLoading(true);
				const response = await axiosHttpService.get(
					API_GOV_FILE_GET_ALL
				);
				setIsLoading(false);
				setFiles(getFileFromResponse(response));
				setDoesFilter(true);
			} catch (err) {
				console.log(err);
			}
		};
		fetchFileData();
	};

	useEffect(() => {
		dispatch({ type: "ADD_FETCH_FILE_ACTION", fetchFileFunction: reset });
		const getPlan = async () => {
			const { data } = await axiosHttpService.get(apiPlan);
			const filterdData = data.filter((item) => {
				return filtePlanCondition(item);
			});

			const _ = filterdData.map((item) => {
				return {
					value: item.id,
					label: item.name,
				};
			});
			_.unshift({
				value: null,
				label: "Tất cả",
			})
			setPlan(_);
		}
		getPlan();
	}, []);

	const handleSearch = async (ev) => {
		try {
			let request = API_GOV_FILE_SEARCH;
			Object.keys(search).forEach((key) => {
				if (key === "state" && (search[key] === 0 || search[key] === "Tất cả"))
					return;
				const value = search[key];
				if ((value !== null) & (value !== ""))
					request += "&" + key + "=" + value;
			});
			setIsLoading(true);
			const response = await axiosHttpService.get(request, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setIsLoading(false);
			setFiles(getFileFromResponse(response));
			setDoesFilter(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleChangeSearch = (name, value) => {
		setSearch((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangeStateFileOfPlan = async (newState) => {
		if (filterByPlan === null) {
			notifyError("Vui lòng chọn kế hoạch")
			return;
		}

		const listState = [];

		for (const file of files) {
			listState.push({
				...newState,
				id: file.id
			});
		}

		try {
			await PlanAPIService.updateStatePlan(filterByPlan, ENUM_STATE_PLAN.DOI_SO_NOI_VU_DUYET);
			const response = await axiosHttpService.post(API_UPDATE_STATE_GOV_FILE, listState);
			const error_code = response.data.error_code;
			if (error_code === undefined) {
				notifySuccess("Thay đổi trạng thái thành công");
				reset();
			} else {
				const description = response.data.description;
				notifyError(description);
			}
		} catch (error) {
			notifyError("Thay đổi trạng thái thất bại");
		}
	};

	const handleChangeStateFileOfPlanSoNoiVu = async (newState) => {
		if (filterByPlan === null) {
			notifyError("Vui lòng chọn kế hoạch")
			return;
		}

		const listState = [];

		for (const file of files) {
			listState.push({
				...newState,
				id: file.id
			});
		}

		try {
			await PlanAPIService.updateStatePlan(filterByPlan, ENUM_STATE_PLAN.CHAP_NHAN);
			const response = await axiosHttpService.post(API_UPDATE_STATE_GOV_FILE, listState);
			const error_code = response.data.error_code;
			if (error_code === undefined) {
				notifySuccess("Thay đổi trạng thái thành công");
				reset();
			} else {
				const description = response.data.description;
				notifyError(description);
			}
		} catch (error) {
			notifyError("Thay đổi trạng thái thất bại");
		}
	};


	const handleChangeStateFile = async (newState) => {
		const listState = [];
		if (stateCheckBox.length > 1 && newState.new_state === 3) {
			// notifySuccess
		}
		for (const state of stateCheckBox) {
			const id = parseInt(
				state.substring(state.indexOf("checkbox") + "checkbox".length)
			);
			listState.push({
				...newState,
				id: id,
			});
		}

		try {
			const response = await axiosHttpService.post(API_UPDATE_STATE_GOV_FILE, listState);
			const error_code = response.data.error_code;
			if (error_code === undefined) {
				notifySuccess("Thay đổi trạng thái thành công");
				// setStateCheckBox([])
				reset();
			} else {
				const description = response.data.description;
				notifyError(description);
			}
		} catch (error) {
			notifyError("Thay đổi trạng thái thất bại");
		}
	};

	const handleRecoverFile = () => {
		dispatch({
			type: "open_modal_recover_file",
			ids: stateCheckBox.map((id) => id.split("checkbox")[1]),
			reFetchData: reset
		})
	}

	useEffect(() => {
		if (filter === null) return;

		setFiles((prev) => {
			return filter(prev);
		});

		setDoesFilter(false);
	}, [doesFilter, filter]);

	useEffect(() => {
		reset();
	}, [userPermissionId]);

	useEffect(() => {
		if (fieldsTableCustom === null) setFieldsTable(FIELDS_TABLE);
		else setFieldsTable(fieldsTableCustom);
	}, [fieldsTableCustom]);

	const handleExportDocToExcel = () => {
		const getExcel = async () => {
			fileSheet.forEach((file) => {
				file.maintenance = file.maintenance_name;
				if (file.maintenance_name !== "Vĩnh viễn") {
					file.maintenance = file.maintenance_name + " năm";
				}
			})
			const response = await axiosCorsService.post(API_EXPORT_EXCEL, {
				luong: 200,
				data: fileSheet,
				cmd: "danhmuc"
			}, {
				responseType: "blob"
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `DanhSachHoSo.xlsx`);
			document.body.appendChild(link);
			link.click();
		}
		getExcel();
	}

	const BUTTON_ACTIONS = [
		{
			title: "Tìm kiếm",
			btn_class_name: "custom-btn-search",
			icon: <i className="fa-solid fa-magnifying-glass"></i>,
			onClick: handleSearch,
		},
		{
			title: "Xuất Excel",
			btn_class_name: "custom-btn-export-excel",
			icon: <i className="fa-solid fa-file-csv"></i>,
			onClick: handleExportDocToExcel,
		},
		{
			title: "Xóa bộ lọc",
			btn_class_name: "custom-btn-clear-filter",
			icon: <i className="fa-solid fa-sync"></i>,
			onClick: resetSearch,
		},
		{
			title: "Thêm hồ sơ mới",
			btn_class_name: "custom-btn-add-file",
			icon: <i className="fa-solid fa-plus"></i>,
			onClick: () => {
				setModalOpen(true);
			},
		},
	];

	if (!addNewFile) {
		BUTTON_ACTIONS.pop();
		BUTTON_ACTIONS.pop();
	}

	if (!excel) {
		BUTTON_ACTIONS.pop();
	}

	if (newButtons !== null) {
		for (const button of newButtons) {
			BUTTON_ACTIONS.push(button);
		}
	}

	const handleFilterFileByPlan = async (value) => {
		setIsLoading(true);
		let res = await FileAPIService.getFileByPlanId(value);
		res = getFileFromResponse({ data: res })
		if (filter !== null) res = filter(res);
		setFiles(res);
		setIsLoading(false);
		setFilterByPlan(value);
	}

	return (
		<>
			<div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
				<p className="text-[14px] font-300 cursor-pointer ">
					<span className="text-[rgba(160,158,158,0.45)]">
						{parent.map((item, index) => {
							return (
								<Link key={index} to={item.link}>
									{item.title} /{" "}
								</Link>
							);
						})}
					</span>
					<span>
						<Link to={current.link}>{current.title}</Link>
					</span>
				</p>
			</div>

			<div className="w-full px-[24px] pb-[16px] bg-white">
				<p className="text-[20px] font-bold ">{current.title}</p>
			</div>
			{showTable && (
				<div>
					<div className="w-full my-[24px]">
						<div className="mt-[16px] mx-[24px] flex ">
							<div className="w-[11.11111%] px-[5px]">
								<Input
									allowClear
									onChange={(ev) =>
										handleChangeSearch("title", ev.target.value)
									}
									value={search["title"]}
									name="title"
									placeholder="Tiêu đề hồ sơ"
									className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px] flex items-center"
								></Input>
							</div>
							<div className="w-[11.11111%] px-[5px]">
								<Input
									value={search["start_date"]}
									onChange={(ev) =>
										handleChangeSearch("start_date", ev.target.value)
									}
									name="start_date"
									placeholder="Ngày bắt đầu"
									type="text"
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
								></Input>
							</div>
							<div className="w-[11.11111%] px-[5px]">
								<Input
									value={search["end_date"]}
									onChange={(ev) =>
										handleChangeSearch("end_date", ev.target.value)
									}
									name="end_date"
									placeholder="Ngày kết thúc"
									type="text"
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
								></Input>
							</div>
							{
								havePlan && <div className="w-[15%] px-[5px]">
									<Select
										options={plan}
										placeholder="Kế hoạch"
										className="border-[0.1rem] text-[12px] w-full truncate h-[32px]"
										onChange={handleFilterFileByPlan}
									></Select>
								</div>
							}
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
							{BMCL_GuiDuyetHoSo && <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex">
								<Button
									onClick={() => handleChangeStateFile({ "current_state": 11, "new_state": 12 })}
									className=" rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] text-white items-center"
								>
									<div className="mr-[8px]">
										<i className="fa-solid fa-file-export"></i>
									</div>
									Gửi duyệt hồ sơ
								</Button>
							</div>}
							{XepVaoKho && <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex">
								<Button
									onClick={() => handleChangeStateFile({ "current_state": 9, "new_state": 10 })} // DA_NHAP_NOP_LUU --> CHO_XEP_KHO
									className=" rounded-[5px] flex justify-center bg-[#00f] w-full px-[90px] py-[1px] text-[12px] text-white items-center"
								>
									<div className="mr-[8px]">
										<i className="fa-solid fa-warehouse"></i>
									</div>
									Đẩy vào hàng đợi xếp kho
								</Button>
							</div>}
							{pheDuyetLuuTruLichSu && <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex">
								<Button
									onClick={() => handleChangeStateFileOfPlan({ "current_state": 5, "new_state": 18 })}
									className=" rounded-[5px] flex justify-center bg-[#00f] w-full px-[90px] py-[1px] text-[12px] text-white items-center"
								>
									<div className="mr-[8px]">
										<i className="fa-solid fa-check"></i>
									</div>
									Gửi Sở Nội vụ phê duyệt
								</Button>
							</div>}
							{soNoiVuDuyet && <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex">
								<Button
									onClick={() => handleChangeStateFileOfPlanSoNoiVu({ "current_state": 18, "new_state": 6 })}
									className=" rounded-[5px] flex justify-center bg-[#00f] w-full px-[90px] py-[1px] text-[12px] text-white items-center"
								>
									<div className="mr-[8px]">
										<i className="fa-solid fa-check"></i>
									</div>
									Phê duyệt lưu trữ lịch sử
								</Button>
							</div>

							}
							{pheDuyetTieuHuy && <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex">
								<Button
									onClick={() => handleChangeStateFileOfPlan({ "current_state": 15, "new_state": 16 })}
									className=" rounded-[5px] flex justify-center bg-[#00f] w-full px-[90px] py-[1px] text-[12px] text-white items-center"
								>
									<div className="mr-[8px]">
										<i className="fa-solid fa-check"></i>
									</div>
									Phê duyệt tiêu huỷ
								</Button>
							</div>}
							{khoiPhuc && <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex">
								<Button
									onClick={handleRecoverFile}
									className=" rounded-[5px] flex justify-center bg-[#00f] w-full px-[90px] py-[1px] text-[12px] text-white items-center"
								>
									<div className="mr-[8px]">
										<i className="fa-solid fa-check"></i>
									</div>
									Khôi phục
								</Button>
							</div>}
							{duyetKhoiPhuc && <div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex">
								<Button
									onClick={() => handleChangeStateFile({ "current_state": 17, "new_state": 10 })}
									className=" rounded-[5px] flex justify-center bg-[#00f] w-full px-[90px] py-[1px] text-[12px] text-white items-center"
								>
									<div className="mr-[8px]">
										<i className="fa-solid fa-check"></i>
									</div>
									Đẩy vào hàng đợi xếp kho
								</Button>
							</div>}
							{haveActionButton &&
								<div className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px]  relative">
									<Button
										disabled={!(stateCheckBox.length > 0)}
										onClick={toggleContent}
										ref={buttonRef}
										className=" disabled:opacity-30 rounded-[5px] flex justify-center items-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] custom-btn-show-action "
									>
										Hành động
										<div className="ml-[4px]">
											<i className="fa-solid fa-chevron-down"></i>
										</div>
									</Button>

									{showContent && (
										<div
											ref={(el) => {
												contentRef.current[0] = el;
											}}
											className="rounded-[5px]  text-left top-[40px] absolute bg-purple-400 w-full text-[14px] z-10"
										>
											{userPermissions.map((permission, index) => {
												return (
													<button key={index}
														className="hover:text-white rounded-[5px]  px-[12px] py-[6px] w-full h-full text-left text-[12px] text-black font-medium border-none truncate"
														onClick={() =>
															handleChangeStateFile(permission.update_state)
														}
													>
														<i className={permission.icon_class}></i>
														{permission.permission_title}
													</button>
												);
											})}
										</div>
									)}
								</div>
							}
						</div>
						<Table
							setStateCheckBox={setStateCheckBox}
							fieldNames={fieldsTable}
							fieldDatas={files}
							isLoading={isLoading}
							isCheckBox={isCheckBox}
						/>
					</div>

					<File reset={reset} />
					<DocCategory
						eOffice={eOffice}
					/>
					<MultimediaCategory
						stateMultimediaCategory={stateMultimediaCategory}
						setStateMultimediaCategory={setStateMultimediaCategory}
					/>

					<ModalCensorship />
					<ModalConfirmLuuTruCoQuan />
					<ModalModificationDocumentConfirmStore />
					<ModalModificationDocumentAddDocument />
					<ModalModificationDocumentAddedDocument />
					<ModalModificationDocumentRequireAddDoc />
					<ModalRecoverFile />
					<PlanAndCategoryFile
						open={modalOpen}
						setOpen={setModalOpen}
						API_PLAN={apiPlan}
						filtePlanCondition={filtePlanCondition}
					/>
				</div>
			)}
		</>
	);
};

export default BasePage;
