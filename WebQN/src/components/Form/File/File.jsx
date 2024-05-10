/* eslint-disable react-hooks/exhaustive-deps */
import axiosHttpService from "src/utils/httpService";

import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector, } from "react-redux";
import * as actionFile from "../../../actions/formFile";
import { FORMAT, LANGUAGE, MAINTENANCE, ORGAN_ID, IDENTIFIER, RIGHTS, IDENTIFIER_CODE } from "../../../storage/FileStorage";
import { Select, Input } from "antd";
import { FirstLower, notifyError, notifySuccess } from "../../../custom/Function";
import UserAPIService from "src/service/api/userAPIService";

const API_GOV_FILE_CREATE = import.meta.env.VITE_API_GOV_FILE_CREATE
const API_GOV_FILE_GET = import.meta.env.VITE_API_GOV_FILE_GET
const API_GOV_FILE_UPDATE = import.meta.env.VITE_API_GOV_FILE_UPDATE
const API_UPDATE_STATE_GOV_FILE =
    import.meta.env.VITE_API_GOV_FILE_UPDATE_STATE;
const API_GET_FOND_BY_ORGAN = import.meta.env.VITE_API_GET_FOND_BY_ORGAN;
const File = ({
    reset,
}) => {
    const location = useLocation();
    const [currentTab, setCurrentTab] = useState(location.pathname.toLocaleLowerCase());
    const userPermissionId = useSelector(state => state.user.permission_id)
    const stateForm = useSelector((state) => state.formFile.state)
    const fileID = useSelector((state) => state.formFile.id)
    const categoryFile = useSelector((state) => state.formFile.category_file)
    const plan = useSelector((state) => state.formFile.plan)
    const language = useSelector((state) => state.language.language)
    const format = useSelector((state) => state.format.format)
    const maintance = useSelector((state) => state.maintance.maintance)
    const [idFileCreate, setIdFileCreate] = useState(null);
    const [organ, setOrgan] = useState(null);
    const [fond, setFond] = useState([]);

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
            type: "input",
            options: organ ? organ.name : "",
            disable: true
        },
        {
            key: "organ_id",
            title: "Mã phông/công trình/sưu tập lưu trữ",
            require: true,
            type: "select",
            options: fond
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
        {
            key: "title",
            title: "Tiêu đề hồ sơ",
            require: true,
            type: "text"
        },
        {
            key: "maintenance",
            title: "Thời hạn bảo quản",
            require: true,
            type: "select",
            options: maintance
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
            options: language
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
            options: format
        },
    ];

    let title = "Tạo hồ sơ"

    switch (stateForm) {
        case "CREATE_FILE":
            title = "Tạo hồ sơ"
            break;
        case "WATCH_FILE":
            title = "Xem hồ sơ"
            break;
        case "EDIT_FILE":
            title = "Sửa hồ sơ"
            break;
        default:
            break;
    }

    const dispatch = useDispatch();
    const [request, setRequest] = useState({
        rights: null,
        gov_file_code: null,
        identifier: null,
        organ_id: null,
        file_catalog: null,
        file_notation: null,
        title: null,
        maintenance: null,
        language: null,
        start_date: null,
        end_date: null,
        total_doc: null,
        description: null,
        infor_sign: null,
        keyword: null,
        sheet_number: null,
        page_number: null,
        format: null
    })


    useEffect(() => {
        if (fileID === null || fileID === undefined) {
            const updatedRequest = {}
            Object.keys(request).forEach(key => {
                updatedRequest[key] = null
            })

            setRequest(prev => updatedRequest)
            return
        }

        const fetchData = async () => {
            const response = await axiosHttpService.get(API_GOV_FILE_GET + "id=" + fileID + "&perm_token=" + userPermissionId)
            const error_code = response.data.error_code
            if (error_code === undefined) {
                setRequest(response.data[0])
            }
        }

        fetchData()

    }, [fileID])

    useEffect(() => {
        const getFond = async () => {
            if (!organ) return;
            const organId = organ.id;
            const res = await axiosHttpService.get(API_GET_FOND_BY_ORGAN + '/' + organId);
            const fond = res.data.map((item) => {
                return {
                    label: item.fond_name,
                    value: item.id
                }
            })
            setFond(fond);
        }
        getFond();
    }, [organ])

    useEffect(() => {
        const getOrgan = async () => {
            const organ = await UserAPIService.getUserOrgan();
            setOrgan(organ);
            handleChangeForm("identifier", organ.id);
        }
        getOrgan();
    }, [])

    const handleChangeForm = (name, value) => {
        setRequest(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const field of FIELDS_LEFT) {
            if (field.require && (request[field.key] === null || request[field.key] === "")) {
                notifyError("Vui lòng nhập " + FirstLower(field.title))
                return
            }
        }

        for (let field of FIELDS_RIGHT) {
            if (field.require && (request[field.key] === null || request[field.key] === "")) {
                notifyError("Vui lòng nhập " + field.title)
                return
            }
        }
        const handleChangeStateFile = async (id) => {
            const bmclFile = {
                current_state: 1,
                new_state: 11,
                id: id,
                perm_token: userPermissionId,

            }
            const response = await axiosHttpService.post(API_UPDATE_STATE_GOV_FILE, [bmclFile]);

            window.location.reload();
        };

        const gov_file_code = organ.code + "." + request["start_date"].split("-")[0] + "." + request["file_notation"]

        const API = title === "Tạo hồ sơ" ? API_GOV_FILE_CREATE : API_GOV_FILE_UPDATE


        try {
            request["category_file"] = categoryFile;
            request["plan_ttnl"] = plan;
            const response = await axiosHttpService.post(API, { ...request, gov_file_code: gov_file_code, perm_token: userPermissionId })
            const error_code = response.data.error_code
            if (error_code === undefined) {
                if (currentTab === "/bien-muc-chinh-ly/bien-muc-ho-so") {
                    handleChangeStateFile(response.data.id);
                }
                notifySuccess(title + ' thành công');
                setRequest((prev) => {
                    return {
                        ...prev,
                        rights: null,
                        gov_file_code: null,
                        identifier: null,
                        organ_id: null,
                        file_catalog: null,
                        file_notation: null,
                        title: null,
                        maintenance: null,
                        language: null,
                        start_date: null,
                        end_date: null,
                        total_doc: null,
                        description: null,
                        infor_sign: null,
                        keyword: null,
                        sheet_number: null,
                        page_number: null,
                        format: null
                    }
                })
                reset()
            } else {
                notifyError(title + ' thất bại');
            }
        } catch (err) {
            notifyError(title + ' thất bại');
        }
    }

    return (
        <>
            {
                (stateForm !== "CLOSE_FILE") && <div className="overflow-y-scroll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[500] bg-[rgba(0,0,0,.45)]">
                    <div className="relative top-[50px] pb-[30px] ">
                        <div className="w-[1000px] max-w-[calc(100vw-80px)] rounded-[2px] my-0 mx-auto bg-white">
                            <div className="relative rounded-[2px] bg-white border-[2px] border-blue-800">
                                <button onClick={() => { dispatch(actionFile.CloseFile()) }} className="text-[20px] absolute right-0 w-[40px] h-[40px] bg-blue-300top-0 text-black font-bold ">
                                    <i className="fa-solid fa-xmark"></i>

                                </button>
                                <div className="bg-blue-300 text-black font-bold py-[16px] px-[24px]">
                                    <p>{title}</p>
                                </div>

                                <div className="p-[24px] text-[14px] ">
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex justify-between">
                                            <div className="w-[50%] px-[10px]">
                                                {FIELDS_LEFT.map((field, index) => {
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
                                                                    disabled={stateForm === "WATCH_FILE"}
                                                                    onChange={(value) => handleChangeForm(field.key, value)}
                                                                    className="block mt-[12px]"
                                                                    options={field.options}
                                                                    defaultValue={field.options[0]}
                                                                    value={request[field.key] === null ? "" : request[field.key]}

                                                                />
                                                            ) : (
                                                                <Input
                                                                    disabled={stateForm === "WATCH_FILE" || field.disable}
                                                                    onChange={(ev) => handleChangeForm(field.key, ev.target.value)}
                                                                    name={field.key}
                                                                    placeholder={placeholder}
                                                                    type={field.type}
                                                                    min="0"
                                                                    value={field.disable ? organ.name : request[field.key] === null ? "" : request[field.key]}
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
                                                                    disabled={stateForm === "WATCH_FILE"}
                                                                    onChange={(value) => handleChangeForm(field.key, value)}
                                                                    className="block mt-[12px]"
                                                                    options={field.options}
                                                                    defaultValue={field.options[0]}
                                                                    value={request[field.key] === null ? "" : request[field.key]}
                                                                />
                                                            ) : (
                                                                <Input
                                                                    disabled={stateForm === "WATCH_FILE"}
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

                                            {
                                                stateForm !== "WATCH_FILE" &&
                                                < input className="mr-[12px] h-[32px] w-[60px] rounded-[5px] text-white font-medium bg-blue-500 cursor-pointer" type="submit" value="Lưu" />
                                            }
                                            <button onClick={() => { dispatch(actionFile.CloseFile()) }} className="h-[32px] w-[60px] bg-gray-300 border-solid border-[1px] rounded-[5px]">Đóng</button>
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
