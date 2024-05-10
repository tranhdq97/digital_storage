import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axiosHttpService from 'src/utils/httpService';
import { useState, useEffect } from 'react';
import { notifyError, notifySuccess } from '../../../custom/Function';
import { Button, Spin, Input, Select } from 'antd';
import { ValidateFormDoc } from '../../../custom/Function';
import { RIGHTS } from 'src/storage/FileStorage';
import UserAPIService from 'src/service/api/userAPIService';
import DocumentAPIService from 'src/service/api/DocumentAPIService';

const API_DOCUMENT_UPDATE = import.meta.env.VITE_API_DOCUMENT_UPDATE
const API_EXTRACT_OCR = import.meta.env.VITE_API_EXTRACT_OCR


const FixDoc = ({ pdfData, pdfFile, setStateFixDoc, stateFixDoc, API_PDF, pdfID, fetchDocumentsOfFile, govFileID, fileData }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [language, setLanguage] = useState([]);
    const [fond, setFond] = useState([]);
    const [format, setFormat] = useState([]);
    const [organ, setOrgan] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState(null);
    const [currentFormat, setCurrentFormat] = useState(null);
    const [currentFond, setCurrentFond] = useState(null);

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

    const fetchCurrentData = async () => {
        if(!pdfData) return;

        const _language = language.find(item => item.value == pdfData.language);
        const _format = format.find(item => item.value == pdfData.format);
        const _fond = fond.find(item => item.value == pdfData.organ_id);

        setCurrentLanguage(_language);
        setCurrentFormat(_format);
        setCurrentFond(_fond);
    }

    const FORM_FIELDS = [
        { key: "doc_ordinal", title: "Số thứ tự", require: true, type: "number" },
        { key: "autograph", title: "Bút tích", require: false, type: "text" },
        { key: "issued_date", title: "Ngày, tháng, năm văn bản", require: true, type: "date" },
        { key: "code_number", title: "Số của văn bản", require: false, type: "text" },
        { key: "doc_code", title: "Mã định danh văn bản", require: false, type: "text" },
        { key: "identifier", title: "Mã cơ quan lưu trữ", require: true, type: "text", disable: true }, // organ


        { key: "mode", title: "Chế độ sử dụng", require: true, type: "select", options: RIGHTS },
        { key: "language", title: "Ngôn ngữ", require: true, type: "select", options: language, defaultValue: currentLanguage },
        // { key: "confidence_level", title: "Mức độ tin cậy", require: true, type: "select", options: },
        { key: "format", title: "Tình trạng vật lý", require: true, type: "select", options: format, defaultValue: currentFormat },
        { key: "organ_id", title: "Mã phông/công trình/sưu tập lưu trữ", require: true, type: "select", options: fond, extract: true, defaultValue: currentFond },



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

    useEffect(() => {
        setIsLoading(true);
        fetchCurrentData();
        setRequest(pdfData);
        fetchData();
        setIsLoading(false);
    }, [pdfData])

    const extractDataOCR = async () => {
        try {
            setIsLoading(true)

            const dataExtract = new FormData();
            await axiosHttpService.get(API_PDF, {
                responseType: 'blob',
            }).then(res => {
                dataExtract.append('file', res.data);
            })
            dataExtract.append('ratio', '20,1');
            dataExtract.append('threshold', '0.7');
            const response = await axiosHttpService.post(API_EXTRACT_OCR, dataExtract, {
                timeout: 20000
            });

            handleChangeForm("code_number", response.data.no.join(' '));
            handleChangeForm("issued_date", response.data.date.join(' '));
            handleChangeForm("autograph", response.data.signer.join(' '));

            setIsLoading(false)
            notifySuccess('Trích xuất thành công')
        } catch (error) {
            setIsLoading(false)
            notifyError('Trích xuất thất bại')
        }
    }

    const handleSubmitForm = async (ev) => {
        ev.preventDefault()
        const formDataValidated = ValidateFormDoc(request)
        try {
            setIsLoading(true);
            request['identifier'] = organ.id;
            await axiosHttpService.post(API_DOCUMENT_UPDATE, { ...formDataValidated, id: pdfID })
            setIsLoading(false)
            notifySuccess('Cập nhật thành công')
        } catch (error) {
            setIsLoading(false)
            notifyError('Cập nhật thất bại')
        }
    }

    const handleChangeForm = (name, value) => {
        setRequest(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClose = () => {
        fetchDocumentsOfFile(govFileID)
        setStateFixDoc(false)
    }

    const handleExtract = (name) => {
        handleChangeForm(name, fileData[name])
    }

    return (
        <>
            {stateFixDoc &&
                <div className="overflow-y-scoll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[1005] bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)]  top-[20px] pb-[30px] ">
                        <div className="h-full  w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className=" h-full relative rounded-[2px] bg-white">
                                <div className="bg-blue-300 text-black py-[8px] px-[24px] relative font-bold">
                                    <p className='text-bold'>Xem và chỉnh sửa</p>
                                    <button onClick={handleClose} className="text-[20px] absolute right-0 w-[2%] h-full flex items-center justify-center bg-blue-300 top-0 text-black ">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className='w-full'>
                                    <div className="flex pt-[8px]">
                                        <div className='h-full pl-[12px] w-[50%]'>
                                            <div className='flex'>
                                                <div className="w-full h-[85vh] overflow-x-hidden overflow-y-auto bg-[#e4e4e4] flex justify-center items-center">
                                                    {pdfFile && (
                                                        <Worker className="w-[60%]" workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.min.js">
                                                            <Viewer className="w-[60%]" fileUrl={API_PDF}
                                                                plugins={[defaultLayoutPluginInstance]}></Viewer>
                                                        </Worker>
                                                    )}

                                                    {/* render this if we have pdfFile state null   */}
                                                </div>

                                            </div>
                                        </div>
                                        <div className='h-full w-[50%] pl-[12px] mr-[12px] '>
                                            <div className='w-full flex justify-end'>
                                                <Button onClick={extractDataOCR} className=' h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px] custom-btn-search'>Trích xuất thông tin</Button>
                                                <Button htmlType="submit" form="fix-doc-form" className='bg-[#2f54eb] h-[30px] rounded-[5px] border-solid border-[1px] px-[8px] mx-[4px] min-w-[50px] text-white text-[12px] custom-btn'>Lưu</Button>
                                            </div>
                                            <div className='flex justify-center w-full'>
                                                <p className={`outline-none w-[50%] block text-[14px] font-bold h-[30px] text-center`}>Danh sách các thuộc tính</p>
                                            </div>
                                            <div className='h-[75vh] overflow-y-auto mt-[16px]'>
                                                {
                                                    <Spin tip="Đang xử lý" spinning={isLoading} delay={0}>
                                                        <div>
                                                            <form id="fix-doc-form" onSubmit={handleSubmitForm}>
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
                                                                                                defaultValue={field.defaultValue ? field.defaultValue : field.options[0]}
                                                                                            >
                                                                                            </Select>
                                                                                        ) : (
                                                                                            <Select
                                                                                                onChange={(value) => handleChangeForm(field.key, value)}
                                                                                                options={field.options}
                                                                                                className="w-full mt-[12px]"
                                                                                                defaultValue={field.defaultValue ? field.defaultValue : field.options[0]}
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
                                                }
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

export default FixDoc
