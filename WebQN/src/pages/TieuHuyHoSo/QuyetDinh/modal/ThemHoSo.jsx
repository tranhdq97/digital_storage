/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "src/custom/Components"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {  STATE } from "src/storage/Storage";
import { FIELDS_TABLE } from "src/storage/FileStorage";

import axiosHttpService from "src/utils/httpService";
import { Button, Input, Modal } from "antd";
import { DateDiff } from "src/custom/Function";

const API_GOV_FILE_GET_ALL = import.meta.env.VITE_API_GOV_FILE_GET_ALL;
const API_GOV_FILE_SEARCH = import.meta.env.VITE_API_GOV_FILE_GET_ALL;

const fieldsTable = [...FIELDS_TABLE];
fieldsTable.pop()

const ThemHoSo = ({
    open,
    setOpen,
    selectedFiles,
    setSelectedFiles,
    doesReset,
    setDoesReset,
}) => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const userPermissionId = useSelector((state) => state.user.permission_id);

    const [search, setSearch] = useState({
        title: null,
        organ_id: null,
        state: 0,
        type: null,
    });

    const dispatch = useDispatch();

    const getFileFromResponse = (response) => {
        const rawDatas = response.data;
        let filesArray = [];
        for (const rawData of rawDatas) {
            if (rawData.maintenance_name === "Vĩnh viễn" || rawData.state != 4) continue;
            if (rawData.plan_nopluuls !== null || rawData.plan_tieuhuy !== null) continue;
            rawData.state = 14;
            let today = new Date()
            const y = today.getFullYear();
            const m = today.getMonth() + 1; // Months start at 0!
            const d = today.getDate();
            today = new Date(`${y}-${m}-${d}`);

            const endDate = new Date(rawData.end_date);
            endDate.setFullYear(endDate.getFullYear() + Number(rawData.maintenance_name));

            if (DateDiff(endDate, today) <= 0 ) continue;

            const row = {
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
                maintenance: rawData.maintenance || "",
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
            };
            filesArray.push(row);
        }
        return filesArray;
    };

    const reset = () => {
        const fetchFileData = async () => {
            try {
                setIsLoading(true);
                const response = await axiosHttpService.get(API_GOV_FILE_GET_ALL);
                setIsLoading(false);
                const files = getFileFromResponse(response);
                setFiles(files);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFileData();
    };

    const handleSearch = async (ev) => {
        try {
            let request = API_GOV_FILE_SEARCH + userPermissionId;
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
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickOnFile = (IDFile) => {
        dispatch({ type: "open", id: IDFile });
    };

    const resetSearch = async () => {
        let request = API_GOV_FILE_SEARCH;
        const response = await axiosHttpService.get(request);
        setFiles(getFileFromResponse(response));
        setSearch((prev) => ({
            title: "",
            organ_id: "",
            state: 0,
            type: "",
            end_date: "",
            start_date: "",
        }));
    };

    const handleChangeSearch = (name, value) => {
        setSearch((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const BUTTON_ACTIONS = [
        {
            title: "Tìm kiếm",
            btn_class_name: "custom-btn-search",
            icon: <i className="fa-solid fa-magnifying-glass"></i>,
            onClick: handleSearch,
        },
        {
            title: "Xóa bộ lọc",
            btn_class_name: "custom-btn-clear-filter",
            icon: <i className="fa-solid fa-sync"></i>,
            onClick: resetSearch,
        }
    ];

    useEffect(() => {
        reset()
    }, []);

    useEffect(() => {
        if(doesReset) {
            reset();
            setDoesReset(false);
        }
    }, [doesReset])

    return (
        <Modal
            style={{
                top: 20,
            }}
            title="Thêm hồ sơ"
            onCancel={() => setOpen(false)}
            onOk={() => { setOpen(false) }}
            open={open}
            className="w-10/12">

            <div className="flex justify-between">
                <div className="w-11/12">
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
                        isCheckBox={true}
                        fieldDatas={files}
                        isLoading={isLoading}
                        fieldNames={fieldsTable}
                        setStateCheckBox={setSelectedFiles}
                        selectedFiles={selectedFiles}
                    />
                </div>
            </div>

        </Modal>
    )
}

export default ThemHoSo
