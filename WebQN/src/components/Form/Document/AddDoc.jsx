/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axiosHttpService from 'src/utils/httpService';
import { Spin, Select } from "antd"
import { GetDateFromString, notifyError, notifySuccess } from '../../../custom/Function';
import { Input, Button } from "antd"
import { ValidateFormDoc } from '../../../custom/Function';
import { FirstLower } from '../../../custom/Function';
import { SetNull } from '../../../custom/Function';
import { useButtonClickOutside } from 'src/custom/Hook';
import sign from 'src/assets/img/sign.jpg'
import sign2 from 'src/assets/img/sign2.png'
import UserAPIService from 'src/service/api/userAPIService';
import DocumentAPIService from 'src/service/api/DocumentAPIService';
import { RIGHTS } from 'src/storage/FileStorage';

const API_EXTRACT_OCR = import.meta.env.VITE_API_EXTRACT_OCR
const API_DOCUMENT_UPLOAD = import.meta.env.VITE_API_DOCUMENT_UPLOAD

const AddDoc = ({
    stateAddDoc,
    setStateAddDoc,
    fileUploaded,
    fetchDocumentsOfFile,
    govFileID,
    fileData
}) => {
    const [request, setRequest] = useState({
        gov_file_id: govFileID,
        file: null,
        issued_date: null,
        autograph: null,
        code_number: null,
        doc_ordinal: null,
        num_page: null,
        doc_code: null,
        identifier: null,
        organ_id: null,
        file_catalog: null,
        file_notation: null,
        type_name: null,
        code_notation: null,
        organ_name: null,
        subject: null,
        language: null,
        page_amount: null,
        description: null,
        infor_sign: null,
        keyword: null,
        mode: null,
        confidence_level: null,
        format: null,
    });

    const [currentTab, setCurrentTab] = useState(0)
    const [pdfFile, setPdfFile] = useState(null);
    const [files, setFiles] = useState(null)
    const [isSubmitFormSuccess, setIsSubmitFormSuccess] = useState(false)
    const allowedFiles = ['application/pdf']
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [isLoading, setIsLoading] = useState(false)
    const [openSign, setOpenSign] = useState(false)
    const [organ, setOrgan] = useState(null);
    const [language, setLanguage] = useState([]);
    const [fond, setFond] = useState([]);
    const [format, setFormat] = useState([]);

    const FORM_FIELDS = [
        { key: "doc_ordinal", title: "Số thứ tự", require: true, type: "number" },
        { key: "autograph", title: "Bút tích", require: false, type: "text" },
        { key: "issued_date", title: "Ngày, tháng, năm văn bản", require: true, type: "date" },
        { key: "code_number", title: "Số của văn bản", require: false, type: "text" },
        { key: "doc_code", title: "Mã định danh văn bản", require: false, type: "text" },
        { key: "identifier", title: "Mã cơ quan lưu trữ", require: true, type: "text", disable: true }, // organ


        { key: "mode", title: "Chế độ sử dụng", require: true, type: "select", options: RIGHTS },
        { key: "language", title: "Ngôn ngữ", require: true, type: "select", options: language },
        // { key: "confidence_level", title: "Mức độ tin cậy", require: true, type: "select", options: },
        { key: "format", title: "Tình trạng vật lý", require: true, type: "select", options: format },
        { key: "organ_id", title: "Mã phông/công trình/sưu tập lưu trữ", require: true, type: "select", options: fond, extract: true },



        { key: "file_catalog", title: "Mục lục số hoặc năm hình thành hồ sơ", require: false, type: "number", extract: true },
        { key: "file_notation", title: "Số và ký hiệu hồ sơ", require: false, type: "text", extract: true },
        { key: "type_name", title: "Tên loại văn bản", require: false, type: "text" },
        { key: "code_notation", title: "Ký hiệu của văn bản", require: false, type: "text" },
        { key: "organ_name", title: "Tên cơ quan, tổ chức ban hành văn bản", require: false, type: "text" },
        { key: "subject", title: "Trích yếu nội dung", require: false, type: "text" },
        { key: "page_amount", title: "Số lượng trang của văn bản", require: false, type: "number" },
        { key: "description", title: "Ghi chú", require: false, type: "text" },
        { key: "infor_sign", title: "Ký hiệu thông tin", require: false, type: "text" },
        { key: "keyword", title: "Từ khóa", require: false, type: "text" },
    ]

    const handleClose = () => {
        setOpenSign(false)
    }
    const [buttonRef, contentRef, toggleContent, showContent] =
        useButtonClickOutside(false, handleClose);

    useEffect(() => {

        const fetchData = async () => {
            const _organ = await UserAPIService.getUserOrgan();
            const _language = await DocumentAPIService.getLanguage();
            const _format = await DocumentAPIService.getFormat();
            const _fond = await DocumentAPIService.getFondByOrgan(_organ.id);

            const language = _language.map(item => ({
                label: item.name,
                value: item.id
            }))

            const format = _format.map(item => ({
                label: item.name,
                value: item.id
            }))

            const fond = _fond.map(item => ({
                label: item.fond_name,
                value: item.id
            }))



            setRequest(prev => ({
               ...prev,
               identifier: _organ.name
            }));

            setOrgan(_organ);
            setLanguage(language);
            setFond(fond);
            setFormat(format);
        }

        setIsLoading(true);
        fetchData();
        setIsLoading(false);

    }, [])

    useEffect(() => {
        setRequest(prev => ({
            ...prev,
            gov_file_id: govFileID
        }))
    }, [govFileID])


    useEffect(() => {
        if (fileUploaded !== null)
            setFiles(fileUploaded)
    }, [fileUploaded])

    const handleChangePdfFile = (index) => {
        if (files === null || files.length === 0) return null
        const selectedFile = files[index];
        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                }
            } else {
                setPdfFile('');
            }
        } else {
            console.log('please select a PDF');
        }
    }

    useEffect(() => {
        handleChangePdfFile(0)
    }, [files])

    // tab operations
    const handleChangeTab = (index) => {
        setRequest((prev) => {
            const cur = SetNull(prev)
            cur['gov_file_id'] = govFileID
            return cur
        })
        handleChangePdfFile(index)
        setCurrentTab(index);
    };

    const handleCloseAllTab = () => {
        setStateAddDoc(false)
        setCurrentTab(0)
        setPdfFile(null)
        setFiles(null)
        setRequest(prev => {
            const cur = SetNull(prev)
            cur['gov_file_id'] = govFileID
            return cur
        })
        if (isSubmitFormSuccess === true) {
            fetchDocumentsOfFile(govFileID)
        }
    }

    const handleCloseTab = (index) => {
        setRequest(prev => {
            const cur = SetNull(prev)
            cur['gov_file_id'] = govFileID
            return cur
        })

        if (index >= files.length)
            return

        if (files.length === 1) {
            handleCloseAllTab()
            return
        }

        setFiles(preFiles => {
            const newFiles = [...preFiles]
            newFiles.splice(index, 1)
            return newFiles
        })
    }

    const handleAddMoreFiles = (ev) => {
        setFiles(preFiles => {
            let newFiles = [...preFiles]
            let addFile = Array.from(ev.target.files)
            newFiles = newFiles.concat(addFile)
            return newFiles
        })
    }

    const extractDataOCR = async () => {
        const selectedFile = files[currentTab]
        const dataExtract = new FormData();
        dataExtract.append('file', selectedFile);
        dataExtract.append('ratio', '20,1');
        dataExtract.append('threshold', '0.7');

        try {
            setIsLoading(true)
            const response = await axiosHttpService.post(API_EXTRACT_OCR, dataExtract, {
                timeout: 20000
            });

            setIsLoading(false)

            handleChangeForm("code_number", response.data.no.join(' '));
            handleChangeForm("issued_date", GetDateFromString(response.data.date.join(' ')));
            handleChangeForm("autograph", response.data.signer.join(' '));

            notifySuccess('Trích xuất thành công')
        } catch (error) {
            setIsLoading(false)
            notifyError('Trích xuất thất bại')
        }
    }

    const handleChangeForm = (name, value) => {
        setRequest(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmitForm = async (ev) => {
        ev.preventDefault()

        for (const field of FORM_FIELDS) {
            if (field.require && (request[field.key] === null || request[field.key] === "")) {
                notifyError("Vui lòng nhập " + FirstLower(field.title))
                return
            }
        }

        const num_page = Number(document.getElementsByClassName("rpv-toolbar__label")[0].textContent.split(" ")[1])
        request["num_page"] = num_page
        request["file"] = files[0]
        const formDataValidated = ValidateFormDoc(request)
        try {
            setIsLoading(true)
            request['identifier'] = organ.id;
            await axiosHttpService.post(API_DOCUMENT_UPLOAD, formDataValidated, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            setIsLoading(false)
            setIsSubmitFormSuccess(true)
            notifySuccess("Thêm văn bản thành công")
        } catch (error) {
            setIsLoading(false)
            notifyError("Thêm văn bản thất bại")
        }
    }

    const handleExtract = (name) => {
        handleChangeForm(name, fileData[name])
    }

    console.log('pdfFile', pdfFile);

    return (
        <>
            {stateAddDoc &&
                <div className="overflow-y-scoll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[1005] bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)]  top-[20px] pb-[30px] ">
                        <div className="h-full  w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className=" h-full relative rounded-[2px] bg-white">
                                <div className="bg-blue-300 text-black  py-[8px] px-[24px] relative font-bold">
                                    <p className='text-bold'>Thêm văn bản</p>
                                    <button onClick={handleCloseAllTab} className="text-[20px] absolute right-0 w-[2%] h-full flex items-center justify-center bg-blue-300 top-0 text-black ">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className='w-full'>
                                    <div className='pl-[4px] flex w-full h-[45px] border-[2px] border-solid border-white bg-blue-200 items-center relative cursor-pointer'>
                                        {files !== null && files.map((file, index) => {
                                            const width = 95 / files.length + "%"
                                            const bgColor = index === currentTab ? "bg-white" : "bg-gray-300"
                                            return (
                                                <div key={index} onClick={() => handleChangeTab(index)} style={{ width: width }} className='max-w-[15%] pr-[4px]'>
                                                    <div className={` ${bgColor}  px-[4px] h-[30px] border-solid border-[1px] rounded-[5px] flex items-center cursor-pointe hover:bg-gray-200 justify-between pl-[6px]`}>
                                                        <p className='leading-[20px] h-[20px] font-medium text-[15px] overflow-hidden '>{file.name}</p>
                                                        <div onClick={() => handleCloseTab(index)} className='text-[12px] w-[15px] h-[15px] rounded-[5px] hover:bg-white flex items-center justify-center'>
                                                            <i className="fa-solid fa-xmark"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        <div className='w-[2%] absolute right-0 text-white h-full rounded-[5px] flex items-center justify-center cursor-pointer'>
                                            <form encType="multipart/form-data">
                                                <label className='cursor-pointer' htmlFor="file-add-upload">
                                                    <i className="fa-solid fa-plus text-blue-700 rounded-[1px] "></i>
                                                </label>
                                                <input onClick={(ev) => { ev.target.value = '' }} type='file' id="file-add-upload" name="file-upload" className="hidden" onChange={(ev) => {
                                                    handleAddMoreFiles(ev)
                                                }
                                                } accept="application/pdf" multiple></input>
                                            </form>
                                        </div>

                                    </div>


                                    <div className="flex pt-[8px]">
                                        <div className='h-full pl-[12px] w-[50%]'>
                                            <div className='flex'>
                                                <div className="w-full h-[80vh] overflow-x-hidden overflow-y-auto bg-[#e4e4e4] flex justify-center items-center">
                                                    {pdfFile && (
                                                        <Worker className="w-[60%]" workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.min.js">
                                                            <Viewer className="w-[60%]" fileUrl={pdfFile}
                                                                plugins={[defaultLayoutPluginInstance]}></Viewer>
                                                        </Worker>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <div className='h-full w-[50%] pl-[12px] mr-[12px] '>
                                            <div className='w-full flex justify-end'>
                                                <div className="text-white text-center px-[5px] rounded-[5px]  relative">
                                                    <Button
                                                        onClick={toggleContent}
                                                        ref={buttonRef}
                                                        className=" disabled:opacity-30 rounded-[5px] flex justify-center items-center py-[6px] text-[12px] bg-sky-500 "
                                                    >
                                                        Ký số
                                                        <div className="ml-[4px]">
                                                            <i className="fa-solid fa-chevron-down"></i>
                                                        </div>
                                                    </Button>

                                                    {showContent && (
                                                        <div
                                                            ref={(el) => {
                                                                contentRef.current[0] = el;
                                                            }}
                                                            className="rounded-[2px] text-left top-[40px] w-[204px] absolute bg-sky-500 text-[14px] z-10"
                                                        >
                                                            <div className='p-[2px]'>
                                                                <img className='borer-2 block border-sky-100 w-[200px] max-w-[1000px]' alt='sign' src={sign} />
                                                                <img className='borer-2 block border-sky-100 mt-[2px] w-[200px] max-w-[1000px]' alt='sign' src={sign2} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <Button onClick={extractDataOCR} className=' h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px] custom-btn-search '>Trích xuất thông tin</Button>
                                                <Button htmlType="submit" form="add-doc-form" className='bg-green-400 h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-black font-medium text-[12px] '>Lưu</Button>
                                            </div>
                                            <div className='flex justify-center w-full'>
                                                <div className={`outline-none w-[50%] block text-[18px] font-bold h-[30px] text-center`}>Danh sách các thuộc tính</div>
                                            </div>

                                            <div className='h-[70vh] overflow-y-auto mt-[16px]'>

                                                <Spin tip="Đang xử lý" spinning={isLoading} delay={0}>
                                                    <div>
                                                        <form id="add-doc-form" onSubmit={handleSubmitForm}>
                                                            <div className="flex justify-between">
                                                                <div className="w-full px-[10px]">
                                                                    {FORM_FIELDS.map((field, index) => {
                                                                        return (
                                                                            <div
                                                                                key={field.key}
                                                                                className="mt-[8px] w-full mb-[24px]"
                                                                            >
                                                                                <label
                                                                                    className={`${field.require ? "after-form" : ""
                                                                                        } text-[14px] font-[500]`}
                                                                                    title={field.title}
                                                                                >
                                                                                    {field.title}
                                                                                    {field.extract === true &&
                                                                                        <span className='ml-[8px] cursor-pointer' title='Trích xuất từ hồ sơ' onClick={() => handleExtract(field.key)}>
                                                                                            <i className="fa-regular fa-clipboard"></i>
                                                                                        </span>
                                                                                    }
                                                                                </label>

                                                                                {field.type === "select" ? (
                                                                                    field.default === true ? (
                                                                                        <Select
                                                                                            onChange={(value) => handleChangeForm(field.key, value)}
                                                                                            options={field.options}
                                                                                            className="w-full mt-[12px]"
                                                                                            defaultValue={field.options[0]}
                                                                                            value={request[field.key]}
                                                                                        >
                                                                                        </Select>
                                                                                    ) : (
                                                                                        <Select
                                                                                            onChange={(value) => handleChangeForm(field.key, value)}
                                                                                            options={field.options}
                                                                                            className="w-full mt-[12px]"
                                                                                            value={request[field.key]}
                                                                                        >
                                                                                        </Select>
                                                                                    )
                                                                                ) : (
                                                                                    <Input
                                                                                        disabled={field?.disable}
                                                                                        onChange={(ev) => handleChangeForm(field.key, ev.target.value)}
                                                                                        name={field.key}
                                                                                        placeholder={field.title}
                                                                                        type={field.type}
                                                                                        min="0"
                                                                                        value={request[field.key]}
                                                                                        className="w-full py-[4px] px-[8px] border-solid border-[1px] rounded-[2px] mt-[12px] h-[30px]"
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>

                                                            </div>
                                                        </form>
                                                    </div>
                                                </Spin>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            }
        </>
    )
}

export default AddDoc
