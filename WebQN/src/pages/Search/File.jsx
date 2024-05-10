/* eslint-disable react-hooks/exhaustive-deps */
import axiosHttpService from "src/utils/httpService";
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector} from "react-redux";
import { FORMAT, IDENTIFIER, LANGUAGE, MAINTENANCE, ORGAN_ID, RIGHTS} from "../../storage/FileStorage";
import { Select, Input } from "antd";

const API_GOV_FILE_GET = import.meta.env.VITE_API_GOV_FILE_GET

const FIELDS_LEFT = [
    {
        key: "gov_file_code",
        title: "Mã hồ sơ",
        require: false,
        type: "text",
    },
    {
        key: "identifier",
        title: "Mã cơ quan lưu trữ",
        require: true,
        type: "select",
        options: IDENTIFIER,
        default: true
    },
    {
        key: "organ_id",
        title: "Mã phông/công trình/sưu tập lưu trữ",
        require: true,
        type: "select",
        options: ORGAN_ID
    },
    {
        key: "file_catalog",
        title: "Mục lục hoặc năm hình thành hồ sơ",
        require: false,
        type: "number",
    },
    {
        key: "file_notation",
        title: "Số và ký hiệu hồ sơ",
        require: true,
        type: "text",
    },
    { key: "title", title: "Tiêu đề hồ sơ", require: true, type: "text" },
    {
        key: "maintenance",
        title: "Thời hạn bảo quản",
        require: true,
        type: "select",
        options: MAINTENANCE
    },
    {
        key: "rights",
        title: "Chế độ sử dụng",
        require: true,
        type: "select",
        options: RIGHTS
    },
    {
        key: "language",
        title: "Ngôn ngữ",
        require: true,
        type: "select",
        options: LANGUAGE
    },
];

const FIELDS_RIGHT = [
    {
        key: "start_date",
        title: "Thời gian bắt đầu",
        require: true,
        type: "date",
    },
    {
        key: "end_date",
        title: "Thời gian kết thúc",
        require: false,
        type: "date",
    },
    {
        key: "total_doc",
        title: "Tổng số văn bản trong hồ sơ",
        require: false,
        type: "number",
    },
    { key: "description", title: "Chú giải", require: false, type: "options" },
    {
        key: "infor_sign",
        title: "Ký hiệu thông tin",
        require: false,
        type: "text",
    },
    { key: "keyword", title: "Từ khóa", require: false, type: "text" },
    { key: "sheet_number", title: "Số lượng tờ", require: false, type: "number" },
    {
        key: "page_number",
        title: "Số lượng trang",
        require: false,
        type: "number",
    },
    {
        key: "format",
        title: "Tình trạng vật lý",
        require: true,
        type: "select",
        options: FORMAT
    },
];

const File = ({ stateFile, setStateFile, govFileId }) => {
    const userPermissionId = useSelector(state => state.user.permission_id)
    const title = "Xem hồ sơ"
    const [request, setRequest] = useState({
        rights: "Công Khai",
        gov_file_code: null,
        identifier: "Trung tâm Lưu trữ lịch sử",
        organ_id: "Phông trung tâm Lưu trữ lịch sử",
        file_catalog: null,
        file_notation: null,
        title: null,
        maintenance: "5 năm",
        language: "Tiếng Việt",
        start_date: null,
        end_date: null,
        total_doc: null,
        description: null,
        infor_sign: null,
        keyword: null,
        sheet_number: null,
        page_number: null,
        format: "Bình thường"
    })

    useEffect(() => {
        if (govFileId === null || govFileId === undefined) {
            const updatedRequest = {}
            Object.keys(request).forEach(key => {
                updatedRequest[key] = null
            })
            updatedRequest['identifier'] = "Trung tâm Lưu trữ lịch sử"
            updatedRequest['rights'] = "Công Khai"
            updatedRequest['organ_id'] = "Phông trung tâm Lưu trữ lịch sử"
            updatedRequest['maintenance'] = "5 năm"
            updatedRequest['language'] = "Tiếng Việt"
            updatedRequest['format'] = "Bình thường"
            setRequest(prev => updatedRequest)
            return
        }

        const fetchData = async () => {
            const response = await axiosHttpService.get(API_GOV_FILE_GET + "id=" + govFileId + "&perm_token=" + userPermissionId)
            const error_code = response.data.error_code
            if (error_code === undefined) {
                setRequest(response.data[0])
            }
        }

        fetchData()

    }, [govFileId])

    const handleChangeForm = (name, value) => {
        setRequest(prevState => ({
            ...prevState,
            [name]: value
        }))
    };


    return (
        <>
            {
                (stateFile === true) && <div className="overflow-y-scroll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[500] bg-[rgba(0,0,0,.45)]">
                    <div className="relative top-[50px] pb-[30px] ">
                        <div className="w-[1000px] max-w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className="relative rounded-[2px] bg-white">
                                <button onClick={() => { setStateFile(false) }} className="text-[20px] absolute right-0 w-[40px] h-[40px] bg-blue-300top-0 text-black font-bold ">
                                    <i className="fa-solid fa-xmark"></i>

                                </button>
                                <div className="bg-blue-300 text-black font-bold py-[16px] px-[24px]">
                                    <p>{title}</p>
                                </div>

                                <div className="p-[24px] text-[14px] ">
                                    <form >
                                        <div className="flex justify-between">
                                            <div className="w-[50%] px-[10px]">
                                                {FIELDS_LEFT.map((field, index) => {
                                                    console.log(field.options)
                                                    const placeholder = field.key === 'gov_file_code' ? "Mã nhảy tự động" : field.title
                                                    return (
                                                        <div
                                                            key={field.key}
                                                            className="mt-[8px] w-full mb-[24px] h-[65px]"
                                                        >
                                                            <label
                                                                className={`${field.require ? "after-form" : ""
                                                                    } text-[14px]`}
                                                                title={field.title}
                                                            >
                                                                {field.title}
                                                            </label>

                                                            {field.type === "select" ? (
                                                                <Select
                                                                    disabled={true}
                                                                    onChange={(value) => handleChangeForm(field.key, value)}
                                                                    className="block mt-[12px]"
                                                                    options={field.options}
                                                                    defaultValue={field.options[0]}
                                                                    value={request[field.key] === null ? "" : request[field.key]}

                                                                />
                                                            ) : (
                                                                <Input
                                                                    disabled={true}
                                                                    onChange={(ev) => handleChangeForm(field.key, ev.target.value)}
                                                                    name={field.key}
                                                                    placeholder={placeholder}
                                                                    type={field.type}
                                                                    min="0"
                                                                    value={request[field.key] === null ? "" : request[field.key]}
                                                                    className="w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px] h-[30px]"
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="w-[50%] px-[10px]">
                                                {FIELDS_RIGHT.map((field, index) => {
                                                    const placeholder = field.key === 'gov_file_code' ? "Mã nhảy tự động" : field.title
                                                    return (
                                                        <div
                                                            key={field.key}
                                                            className="mt-[8px] w-full mb-[24px] h-[65px]"
                                                        >
                                                            <label
                                                                className={`${field.require ? "after-form" : ""
                                                                    } text-[14px]`}
                                                                title={field.title}
                                                            >
                                                                {field.title}
                                                            </label>

                                                            {field.type === "select" ? (
                                                                <Select
                                                                    disabled={true}
                                                                    onChange={(value) => handleChangeForm(field.key, value)}
                                                                    className="block mt-[12px]"
                                                                    options={field.options}
                                                                    defaultValue={field.options[0]}
                                                                    value={request[field.key] === null ? "" : request[field.key]}
                                                                />
                                                            ) : (
                                                                <Input
                                                                    disabled={true}
                                                                    onChange={(ev) => handleChangeForm(field.key, ev.target.value)}
                                                                    name={field.key}
                                                                    placeholder={placeholder}
                                                                    type={field.type}
                                                                    min="0"
                                                                    value={request[field.key] === null ? "" : request[field.key]}
                                                                    className="w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px] h-[30px]"
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <button onClick={() => { setStateFile(false) }} className="h-[32px] w-[60px] bg-gray-300 border-solid border-[1px] rounded-[5px]">Đóng</button>
                                        </div>

                                    </form>

                                </div>

                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    );
};

export default File;
