/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Table } from "src/components/Table";
import "react-toastify/dist/ReactToastify.css";
import { FIELDS_TABLE_SEARCH_FILE } from "src/storage/FileStorage";
import { useNavigate, useLocation } from "react-router-dom";
import FileAPIService from "src/service/api/FileAPIService";
import { setHeaderUnfixed } from "src/service/actions/headerAction";
import { useDispatch } from "react-redux";
import { addFileToCart } from "src/service/actions/cartAction";
import { Input, Button as BtnAntd } from "antd";
import { Button } from "@mui/material";
import { notifySuccess } from "src/utils/function";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';

const parseQuery = (params) => {
    let request = "";
    Object.keys(params).forEach((key) => {
        if (key === "state" && (params[key] === 0 || params[key] === "Tất cả"))
            return;
        const value = params[key];
        if ((value !== null) & (value !== ""))
            request += "&" + key + "=" + value;
    });
    return request;
}

const FileSearch = ({
    showTable = true
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).toString();
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stateCheckBox, setStateCheckBox] = useState([]);
    const [search, setSearch] = useState({});

    dispatch(setHeaderUnfixed());
    const handleClickViewFile = (id) => {
        navigate(`/ho-so/${id}`);
    }

    const handleAddFileToCart = (file) => {
        notifySuccess("Thêm hồ sơ vào giỏ hàng thành công!")
        dispatch(addFileToCart(file));
    }

    const getFileFromResponse = (response) => {
        let filesArray = [];
        for (const rawData of response) {
            const row = {};
            row.id = rawData.id;
            for (const field of FIELDS_TABLE_SEARCH_FILE) {
                const { key } = field;
                if (key === "borrow") {
                    row.borrow = (
                        <Button className="cursor-pointer text-blue-500 italic underline" onClick={() => handleAddFileToCart(rawData)}>Mượn</Button>
                    );
                }
                else row[key] = (
                    <p className="cursor-pointer" onClick={() => handleClickViewFile(rawData.id)}>
                        {rawData[key] || ""}
                    </p>
                );
            }

            filesArray.push(row);
        }
        return filesArray;
    };

    const resetSearch = async () => {
        setSearch({});
        navigate("/ho-so");
    };

    const handleSearch = async () => {
        setIsLoading(true);
        const response = await FileAPIService.searchFile(searchQuery);
        setFiles(getFileFromResponse(response));
        setIsLoading(false);
    }

    const handleClickSearch = async () => {
        const query = parseQuery(search);
        navigate(`/ho-so?${query}`);
    };

    const handleChangeSearch = (name, value) => {
        setSearch((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        handleSearch()
    }, [searchQuery])

    const BUTTON_ACTIONS = [
        {
            title: "Tìm kiếm",
            btn_class_name: "custom-btn-search",
            icon: <SearchIcon />,
            onClick: handleClickSearch,
        },
        {
            title: "Xóa bộ lọc",
            btn_class_name: "custom-btn-clear-filter",
            icon: <RestartAltIcon />,
            onClick: resetSearch,
        }
    ];

    return (
        <>
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    {/*<span className="text-[rgba(160,158,158,0.45)]">
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
                    */}
                </p>
            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white">
                <p className="text-[20px] font-bold ">Danh sách hồ sơ</p>
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

                            {BUTTON_ACTIONS.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex"
                                    >
                                        <BtnAntd
                                            onClick={item.onClick}
                                            className={`rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] text-white items-center ${item.btn_class_name}`}
                                        >
                                            <div className="mr-[8px]">{item.icon}</div>
                                            {item.title}
                                        </BtnAntd>
                                    </div>
                                );
                            })}


                        </div>
                        <Table
                            setStateCheckBox={setStateCheckBox}
                            fieldNames={FIELDS_TABLE_SEARCH_FILE}
                            fieldDatas={files}
                            isLoading={isLoading}
                            isCheckBox={true}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default FileSearch;
