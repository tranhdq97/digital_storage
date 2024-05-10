/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/TieuHuyHoSo/QuyetDinh/Base";
import { useEffect, useState, useCallback } from "react";
import axiosHttpService from "src/utils/httpService";
import { Button, Input, Modal} from "antd";
import ThemHoSo from "src/pages/TieuHuyHoSo/QuyetDinh/modal/ThemHoSo";

const API_RESTORE_PLAN = import.meta.env.VITE_API_RESTORE_PLAN

const parent =
    { title: "Tiêu hủy hồ sơ", 
     //link: "/tieu-huy-ho-so/khoi-phuc/tra-ve" 
    }

const current = {
    link: "/tieu-huy-ho-so/khoi-phuc/tra-ve",
    title: "Quyết định trả về"
}


const Update = ({ reFetchData, id }) => {
    const [request, setRequest] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [openModalAddFile, setOpenModalAddFile] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const getPlan = async () => {
        const { data } = await axiosHttpService.get(API_RESTORE_PLAN + id);
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
        await axiosHttpService.put(API_RESTORE_PLAN + id, request);
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


const TraVeQuyetDinhKhoiPhuc = () => {
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const reFetchData = useCallback(async () => {
        setIsLoading(true);
        const res = await axiosHttpService.get(`${API_RESTORE_PLAN}`);
        const rawDatas = res.data;
        const plans = [];
        for (const rawData of rawDatas) {
            if (rawData.state !== "Trả Về") continue
            const row = {
                id: rawData.id,
                name: rawData.name,
                date: rawData.date,
                organ: rawData.organ,
                state: (
                    <button>{rawData.state}
                    </button>
                ),
                function: (
                    <div className="flex">
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
                isLoading={isLoading}
            />

        </div>
    )
}

export default TraVeQuyetDinhKhoiPhuc;
