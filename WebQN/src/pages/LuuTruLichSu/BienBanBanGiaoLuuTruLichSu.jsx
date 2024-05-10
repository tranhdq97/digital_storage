/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "./BasePage";
import { useEffect, useState, useCallback } from "react";
import axiosHttpService from "src/utils/httpService";
import { Button, Input, Modal, Popconfirm, Select } from "antd";
import ThemHoSo from "src/pages/TieuHuyHoSo/QuyetDinh/modal/ThemHoSo";
import { notifySuccess } from "src/custom/Function";

const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;
const API_STORE_HISTORY_DELIVERY_RECORDS = import.meta.env.VITE_API_STORE_HISTORY_DELIVERY_RECORDS

const parent =
    { title: "Lưu trữ lịch sử", 
    // link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap" 
}

const current = {
    link: "/thu-thap-va-nop-luu/bien-ban-ban-giao",
    title: "Biên bản bàn giao"
}

const Create = ({
    modalOpen,
    setModelOpen,
    reFetchData
}) => {
    const [request, setRequest] = useState({
        state: "Tạo mới"
    });
    const [organ, setOrgan] = useState([]);
    const [openModalAddFile, setOpenModalAddFile] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

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
        await axiosHttpService.post(`${API_STORE_HISTORY_DELIVERY_RECORDS}`, request);
        setTimeout(() => {
            reFetchData();
            setRequest({
                state: "Tạo mới"
            });
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

    useEffect(() => {
        handleChangeRequest("files", selectedFiles)
    }, [JSON.stringify(selectedFiles)])


    return (
        <div>
            <Modal
                title="Tạo biên bản mới"
                style={{
                    top: 20,
                }}
                open={modalOpen}
                onOk={handleOk}
                onCancel={handleCancle}
            >
                <div>
                    <div className="flex justify-between py-[12px]">
                        <span>Tên biên bản</span>
                        <Input
                            name="name"
                            onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                            type="text"
                            className="w-[70%]"
                            value={request["name"]}
                        />
                    </div>

                    <div className="flex justify-between py-[12px]">
                        <span>Ngày tạo biên bản</span>
                        <Input
                            name="date"
                            onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                            type="date"
                            className="w-[70%]"
                            value={request["date"]}
                        />
                    </div>

                    <div className="flex justify-between py-[12px]">
                        <span>Cơ quan / Đơn vị  </span>
                        <Select
                            name="organ"
                            onChange={(value) => handleChangeRequest("organ", value)}
                            className="w-[70%]"
                            value={request["organ"]}
                            options={organ}
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
                    <div className="flex justify-between py-[12px]">
                        <span>Hồ sơ đã chọn</span>
                        <div
                            className="w-[70%]"
                        >
                            <Button className="mr-[4px]"> Phổ biến công tác phòng cháy chữa cháy</Button>
                        </div>
                    </div>
                </div>

                <ThemHoSo
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
            await axiosHttpService.delete(API_STORE_HISTORY_DELIVERY_RECORDS + id);
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

    const getPlan = async () => {
        const { data } = await axiosHttpService.get(API_STORE_HISTORY_DELIVERY_RECORDS + id);
        setRequest({
            name: data.name,
            date: data.date,
            organ: data.organ,
        });
        setSelectedFiles(data.files)
    };

    useEffect(() => {
        getPlan();
        console.log("id", id)
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

    const handleOk = async () => {
        await axiosHttpService.put(API_STORE_HISTORY_DELIVERY_RECORDS + id, request);
        setModalOpen(false);
        reFetchData();
    };

    const handleCancle = () => {
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
                onCancel={handleCancle}
            >
                <div className="flex justify-between items-center">
                    <span>Tên biên bản</span>
                    <Input
                        name="name"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        className="w-[70%]"
                        value={request["name"]}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Ngày biên bản</span>
                    <Input
                        name="date"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        type="date"
                        className="w-[70%]"
                        value={request["date"]}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Cơ quan / Đơn vị</span>
                    <Input
                        name="organ"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        type="text"
                        className="w-[70%]"
                        value={request["organ"]}
                    />

                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Hồ sơ</span>
                    <div
                        className="w-[70%]"
                    >
                        <Button onClick={() => {
                            setOpenModalAddFile(true)
                        }}> Xem hồ sơ </Button>
                    </div>
                </div>
                <ThemHoSo
                    open={openModalAddFile}
                    setOpen={setOpenModalAddFile}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
            </Modal>
        </div>
    );
};


const BienBanBanGiaoLuuTruLichSu = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState([]);


    const BUTTON_ACTIONS = [
        {
            title: "Tạo biên bản",
            btn_class_name: "custom-btn-add-file",
            icon: <i className="fa-solid fa-plus"></i>,
            onClick: () => {
                setModalOpen(true);
            },
        },
        {
            title: "In biên bản",
            btn_class_name: "custom-btn-export-excel",
            icon: <i className="fa-solid fa-file-csv"></i>,

        }
    ]

    const reFetchData = useCallback(async () => {
        setIsLoading(true);
        const res = await axiosHttpService.get(`${API_STORE_HISTORY_DELIVERY_RECORDS}`);
        const rawDatas = res.data;
        const plans = [];
        for (const rawData of rawDatas) {
            const row = {
                id: rawData.id,
                name: rawData.name,
                date: rawData.date,
                organ: rawData.organ,
                function: (
                    <div className="flex">
                        <Delete id={rawData.id} reFetchData={reFetchData} />
                        <Update id={rawData.id} reFetchData={reFetchData} />
                    </div>
                ),
            };
            plans.push(row);
        }
        setPlan(plans);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        reFetchData()
    }, [])

    return (
        <div>
            <BasePage
                parent={parent}
                current={current}
                plan={plan}
                btnActions={BUTTON_ACTIONS}
                isLoading={isLoading}
                setSelectedPlan={setSelectedPlan}
            />

            <Create
                setModelOpen={setModalOpen}
                modalOpen={modalOpen}
                reFetchData={reFetchData}
            />

        </div>
    )
}

export default BienBanBanGiaoLuuTruLichSu;
