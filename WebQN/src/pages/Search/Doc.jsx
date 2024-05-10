import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axiosHttpService from 'src/utils/httpService';
import { useState, useEffect } from 'react';
import {Spin, Input, Select } from 'antd';
import { FORM_FIELDS } from '../../storage/DocumentStorage';

const API_DOCUMENT_GET = import.meta.env.VITE_API_DOCUMENT_GET
const Doc = ({ setStateFixDoc, stateFixDoc, id, govFileId }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [isLoading, setIsLoading] = useState(false)
    const [pdfData, setPdfData] = useState(null)


    const handleClose = () => {
        setStateFixDoc(false)
    }

    useEffect(() => {
        if (id === null)
            return
        const fetchData = async () => {
            setIsLoading(true)
            const response = await axiosHttpService.get(API_DOCUMENT_GET + govFileId)
            const file = response.data
            for (const doc of file)
                if (doc.id === id)
                    setPdfData(doc)
            setIsLoading(false)
        }
        fetchData()
    }, [id])


    return (
        <div>
            {stateFixDoc && (pdfData !== null) &&
                <div className="overflow-y-scoll fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[1005] bg-[rgba(0,0,0,.45)]">
                    <div className="relative  h-[calc(100vh)]  top-[20px] pb-[30px] ">
                        <div className="h-full  w-[calc(100vw-80px)] my-0 mx-auto bg-white">
                            <div className=" h-full relative rounded-[2px] bg-white">
                                <div className="bg-blue-300 text-black py-[8px] px-[24px] relative font-bold">
                                    <p className='text-bold'>Xem văn bản</p>
                                    <button onClick={handleClose} className="text-[20px] absolute right-0 w-[2%] h-full flex items-center justify-center bg-blue-300 top-0 text-black ">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className='w-full'>
                                    <div className="flex pt-[8px]">
                                        <div className='h-full pl-[12px] w-[50%]'>
                                            <div className='flex'>
                                                <div className="w-full h-[85vh] overflow-x-hidden overflow-y-auto bg-[#e4e4e4] flex justify-center items-center">
                                                    {pdfData && (
                                                        <Worker className="w-[60%]" workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.min.js">
                                                            <Viewer className="w-[60%]" fileUrl={pdfData.url}
                                                                plugins={[defaultLayoutPluginInstance]}></Viewer>
                                                        </Worker>
                                                    )}

                                                </div>

                                            </div>
                                        </div>
                                        <div className='h-full w-[50%] pl-[12px] mr-[12px] '>

                                            <div className='flex justify-center w-full'>
                                                <p className={`outline-none w-[50%] block text-[14px] font-bold h-[30px] text-center`}>Danh sách các thuộc tính</p>
                                            </div>
                                            <div className='h-[75vh] overflow-y-auto mt-[16px]'>
                                                {
                                                    <Spin tip="Đang xử lý" spinning={isLoading} delay={0}>
                                                        <div>
                                                            <form id="fix-doc-form">
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

                                                                                    </label>

                                                                                    {field.type === "select" ? (
                                                                                        field.default === true ? (
                                                                                            <Select
                                                                                                disabled
                                                                                                options={field.options}
                                                                                                className="w-full mt-[12px]"
                                                                                                defaultValue={field.options[0]}
                                                                                                value={pdfData[field.key]}
                                                                                            >
                                                                                            </Select>
                                                                                        ) : (
                                                                                            <Select
                                                                                                disabled
                                                                                                options={field.options}
                                                                                                className="w-full mt-[12px]"
                                                                                                value={pdfData[field.key]}
                                                                                            >
                                                                                            </Select>
                                                                                        )
                                                                                    ) : (
                                                                                        <Input
                                                                                            disabled
                                                                                            name={field.key}
                                                                                            placeholder={field.title}
                                                                                            type={field.type}
                                                                                            min="0"
                                                                                            value={pdfData[field.key]}
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
        </div>
    )
}

export default Doc
