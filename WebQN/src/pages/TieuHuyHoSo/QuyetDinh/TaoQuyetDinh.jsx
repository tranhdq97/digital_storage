/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axiosHttpService from "src/utils/httpService";
import { Button, Input, Modal, Popconfirm } from "antd";
import ThemHoSo from "src/pages/TieuHuyHoSo/QuyetDinh/modal/ThemHoSo";
import PlanAPIService from "src/service/api/PlanAPIService";
import UserAPIService from "src/service/api/userAPIService";

import { Link } from "react-router-dom";
import { Table } from "src/custom/Components/Table";
import { notifyError, notifySuccess } from "src/custom/Function";

import { ENUM_STATE_FILE, ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";
import FileAPIService from "src/service/api/FileAPIService";
import XoaHoSo from "./modal/XoaHoSo";

const API_DELETE_PLAN = import.meta.env.VITE_API_PLAN
const API_GET_PLAN = import.meta.env.VITE_API_PLAN;
const API_GET_PLAN_BY_TYPE = import.meta.env.VITE_API_GET_PLAN_BY_TYPE

const FIELDS_TABLE = [
    { title: "Tên kế hoạch", key: "name", width: "150%" },
    { title: "Ngày kế hoạch", key: "start_date", width: "100%" },
    { title: "Cơ quan / Đơn vị lập kế hoạch", key: "organ", width: "100%" },
    { title: "Trạng thái", key: "state", width: "70%" },
    { title: "Chức năng", key: "function", width: "120px" },
];

const parent =
{
    title: "Tiêu hủy hồ sơ",
    //link: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh" 
}

const current = {
    link: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh",
    title: "Tạo quyết định"
}

const Create = ({
    modalOpen,
    setModelOpen,
    reFetchData
}) => {
    const [request, setRequest] = useState({
        state: "Tạo mới"
    });
    const [openModalAddFile, setOpenModalAddFile] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [organName, setOrganName] = useState("");
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const getOrgan = async () => {
            const organ = await UserAPIService.getUserOrgan();
            handleChangeRequest("organ", organ.id);
            setOrganName(organ.name);
        };

        getOrgan();
    }, []);

    const handleOk = async () => {
        request["state"] = "Mới lập";
        request["type"] = ENUM_TYPE_PLAN.QUYET_DINH_TIEU_HUY;
        const response = await PlanAPIService.createPlan(request);
        const idPlan = response.id;

        selectedFiles.forEach(async (file) => {
            const payload = {
                plan_id: idPlan,
                gov_file_id: parseInt(file.substring(file.indexOf("checkbox") + "checkbox".length)),
            };
            await PlanAPIService.setPlanTieuHuyForFile(payload);
        });


        setTimeout(() => {
            reFetchData();
            setRequest({});
            setModelOpen(false);
            setReset(true);
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

    useEffect(() => {
        handleChangeRequest("files", selectedFiles)
    }, [JSON.stringify(selectedFiles)])


    return (
        <div>
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
                    <div className="flex justify-between py-[12px]">
                        <span>Tên quyết định</span>
                        <Input
                            name="name"
                            onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                            type="text"
                            className="w-[70%]"
                            value={request["name"]}
                        />
                    </div>

                    <div className="flex justify-between py-[12px]">
                        <span>Ngày quyết định</span>
                        <Input
                            name="start_date"
                            onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                            type="date"
                            className="w-[70%]"
                            value={request["start_date"]}
                        />
                    </div>

                    <div className="flex justify-between py-[12px]">
                        <span>Cơ quan / Đơn vị  </span>
                        <Input
                            disabled={true}
                            name="organ"
                            className="w-[70%]"
                            value={organName}
                        />
                    </div>

                    <div className="flex justify-between py-[12px]">
                        <span>Hồ sơ</span>
                        <div
                            className="w-[70%]"
                        >
                            <Button onClick={() => {
                                setOpenModalAddFile(true)
                            }}> Chọn hồ sơ </Button>
                        </div>
                    </div>

                </div>

                <ThemHoSo
                    doesReset={reset}
                    setDoesReset={setReset}
                    open={openModalAddFile}
                    setOpen={setOpenModalAddFile}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
            </Modal>
        </div>

    );
};

const Delete = ({ id, reFetchData }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        const deletePlan = async () => {
            await axiosHttpService.delete(API_DELETE_PLAN + '/' + id);
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
    const [openModalAddFile, setOpenModalAddFile] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [organName, setOrganName] = useState("");
    const [openModalDeleteFile, setOpenModalDeleteFile] = useState(false);
    const [removeFile, setRemoveFile] = useState([]);
	const [resetRemove, setResetRemove] = useState(false);
	const [resetAdd, setResetAdd] = useState(false);
	const [addFile, setAddFile] = useState([]);

    const getPlan = async () => {
        if (!id) return;
        const data = await PlanAPIService.getPlanById(id);
        setRequest({
            name: data.name,
            start_date: data.start_date,
            organ_name: data.organ_name,
            organ: data.organ,
            state: data.state,
        });
        setOrganName(data.organ_name);
        setSelectedFiles(data.files)
    };

    useEffect(() => {
        getPlan();
    }, [id]);

    const handleChangeRequest = (name, value) => {
        return setRequest({
            ...request,
            [name]: value,
        });
    };

    const handleClick = () => {
        setModalOpen(true);
    };

    const handleRemoveFile = async () => {
        for(const checkbox of removeFile){
            const idFile = checkbox.split('checkbox')[1]
            await PlanAPIService.removeFileFromPlan(idFile);    
        }
    };

	const handleAddFile = async () => {
		for(const checkbox of addFile){
			const idFile = checkbox.split('checkbox')[1]
			const payload = {
				plan_id: id,
				gov_file_id: idFile,
			}
			await PlanAPIService.setPlanForFile(payload);
		}
	}

    const handleOk = async () => {
        await axiosHttpService.put(API_GET_PLAN + '/' + id, request);
		await handleRemoveFile();
		await handleAddFile();
		setResetAdd(true);
		setResetRemove(true);
		reFetchData();
		setModalOpen(false);
		notifySuccess("Cập nhật thành công");
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        handleChangeRequest("files", selectedFiles)
    }, [JSON.stringify(selectedFiles)])

    return (
        <div>
            <Button onClick={handleClick} className="border-none">
                <i className="fa-regular fa-pen-to-square"></i>
            </Button>
            <Modal
                open={modalOpen}
                title="Sửa"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex justify-between items-center">
                    <span>Tên quyết định</span>
                    <Input
                        name="name"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        className="w-[70%]"
                        value={request["name"]}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Ngày quyết định</span>
                    <Input
                        name="start_date"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        type="date"
                        className="w-[70%]"
                        value={request["start_date"]}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Cơ quan / Đơn vị</span>
                    <Input
                        name="organ"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        type="text"
                        className="w-[70%]"
                        value={organName}
                        disabled={true}
                    />

                </div>
                <div className="flex justify-between py-[12px]">
					<span>Thêm hồ sơ</span>
					<div
						className="w-[70%]"
					>
						<Button onClick={() => {
							setOpenModalAddFile(true)
						}}> Thêm hồ sơ mới vào kế hoạch</Button>
					</div>
				</div>
				<div className="flex justify-between py-[12px]">
					<span>Xoá hồ sơ</span>
					<div
						className="w-[70%]"
					>
						<Button onClick={() => {
							setOpenModalDeleteFile(true)
						}}> Xoá hồ sơ trong kế hoạch</Button>
					</div>
				</div>
                <ThemHoSo
					open={openModalAddFile}
					setOpen={setOpenModalAddFile}
					selectedFiles={addFile}
					setSelectedFiles={setAddFile}
					doesReset={resetAdd}
					setDoesReset={setResetAdd}
				/>

                <XoaHoSo
					open={openModalDeleteFile}
					idPlan={id}
					setOpen={setOpenModalDeleteFile}
					selectedFiles={removeFile}
					setSelectedFiles={setRemoveFile}
					doesReset={resetRemove}
					setDoesReset={setResetRemove}
				/>
            </Modal>
        </div>
    );
};


const TaoQuyetDinh = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [stateCheckBox, setStateCheckBox] = useState([]);
    const [plan, setPlan] = useState([]);

    const handleSendPlan = async () => {
        setIsLoading(true);
        try {
            stateCheckBox.forEach(async (item) => {
                const id = parseInt(item.substring(item.indexOf("checkbox") + "checkbox".length))
                await PlanAPIService.updateStatePlan(id, ENUM_STATE_PLAN.CHO_DUYET);
                await FileAPIService.updateStateByIdPlan(id, {
                    current_state: 14, // chờ tiêu huỷ
                    new_state: 15 // đợi phê duyệt tiêu huỷ
                })
                
            })

            setTimeout(() => {
                reFetchData();
                setIsLoading(false);
            }, 500);

        } catch (err) {
            console.log("err in send plan nop luu lich su", err)
            notifyError("Gửi kế hoạch thất bại");
        }

    };


    const BUTTON_ACTIONS = [
        {
            title: "Tìm kiếm",
            btn_class_name: "custom-btn-search",
            icon: <i className="fa-solid fa-magnifying-glass"></i>,
        },
        {
            title: "Tạo quyết định",
            btn_class_name: "custom-btn-add-file",
            icon: <i className="fa-solid fa-plus"></i>,
            onClick: () => {
                setModalOpen(true);
            },
        },
        {
            title: "Gửi quyết định",
            btn_class_name: "custom-btn-clear-filter",
            onClick: handleSendPlan,
            icon: <i className="fa-solid fa-sync"></i>,
        }
    ]

    const reFetchData = async () => {
        setIsLoading(true);
        const res = await axiosHttpService.get(`${API_GET_PLAN_BY_TYPE}/${ENUM_TYPE_PLAN.QUYET_DINH_TIEU_HUY}`);
        const rawDatas = res.data;
        const plan = [];
        for (const rawData of rawDatas) {
            // let color = "bg-indigo-700";
            // if (rawData.state === ENUM_STATE_PLAN.CHO_DUYET) color = "bg-green-500";
            // else if (rawData.state === ENUM_STATE_PLAN.TAO_MOI) color = "bg-lime-500";
            // else if (rawData.state === ENUM_STATE_PLAN.CHAP_NHAN) color = "bg-blue-600";
            const row = {
                id: rawData.id,
                name: rawData.name,
                start_date: rawData.start_date,
                organ_name: rawData.organ_name,
                state: <button>{rawData.state}</button>,
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
                        Tiêu huỷ hồ sơ /{" "}
                    </span>
                    <span>
                        <Link to="/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh">
                            Tạo quyết định
                        </Link>
                    </span>
                </p>
            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <p className="text-[20px] font-bold ">Tạo quyết định tiêu huỷ hồ sơ</p>
            </div>

            <div className="mt-[16px] mx-[24px] flex ">
                <div className="w-[11.11111%] px-[5px]">
                    <Input
                        allowClear
                        name="title"
                        placeholder="Tìm kiếm tên quyết định"
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
        </div>
    )
}

export default TaoQuyetDinh;
