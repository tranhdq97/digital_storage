import KhaiBaoDanhMuc from "../Base"

/* eslint-disable react-hooks/exhaustive-deps */

import { PHYSICAL_STATE, PHYSICAL_STATE_INPUT } from "src/storage/Storage"
import { Input, Modal, Button, Switch, Select, Popconfirm } from "antd";
import { GetKey, notifyError, notifySuccess } from "../../../custom/Function";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link } from "react-router-dom";

const Search = Input.Search
const API_PHYSICAL_STATE = import.meta.env.VITE_API_PHYSICAL_STATE

const Form = ({ modalOpen, setModalOpen, id, fetchFieldData }) => {
    const [request, setRequest] = useState({})

    const handleChangeRequest = (name, value) => {
        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const res = await axiosHttpService.get(API_PHYSICAL_STATE + '/' + id)
                const data = res.data
                setRequest(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [id])


    const handleCancle = () => {
        setModalOpen(false)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (request === null) {
            notifyError("Vui lòng điền đầy đủ thông tin")
            return
        }

        for (const input of PHYSICAL_STATE_INPUT) {
            if (!request[input.name]) {
                notifyError("Vui lòng nhập " + input.label)
                return
            }
        }

        if (id !== null) {
            await axiosHttpService.put(API_PHYSICAL_STATE + '/' + id, request)
            notifySuccess("Cập nhật tình trạng vật lý thành công")
        } else {
            await axiosHttpService.post(API_PHYSICAL_STATE, request)
            notifySuccess("Tạo tình trạng vật lý thành công")
        }
        setRequest({})

        setTimeout(() => {
            setModalOpen(false)
            fetchFieldData()
        }, 500)
    }

    return (
        <Modal
            title="Tạo tình trạng vật lý"
            style={{
                top: 20,
            }}
            className="w-[600px]"
            open={modalOpen}
            onCancel={handleCancle}
            footer={null}
        >

            {PHYSICAL_STATE_INPUT.map((input) => {
                return (
                    <div className="flex mb-[30px]">
                        <div className={`w-[30%] after-form`}>
                            {input.label}
                        </div>
                        <div className="w-[70%]">
                        {input.type === "number" ? 
                            <Input 
                                type="number"
                                name={input.name}
                                value={request[input.name]}
                                onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)}
                                className="w-[70px]"
                                min={0}
                            /> :
                            <Input
                                type="text"
                                name={input.name}
                                value={request[input.name]}
                                onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)}
                            />
                    }
                        </div>
                    </div>
                )
            })}

            <div className="flex justify-end">
                <Button className="mr-[10px]"
                    onClick={handleCancle}>Hủy</Button>
                <Button
                    type="submit"
                    className="bg-[#00f] text-white"
                    form="tao-ngon-ngu"
                    onClick={onSubmit}>
                    {id !== null ? "Cập nhật" : "Tạo"}
                </Button>
            </div>

        </Modal >
    )
}

const SearchBar = () => {
    return (
        <div className="mx-[24px] mt-[8px] flex">

            <div className="bg-white p-[12px] w-[300px] max-w-[25%]">
                <p className="mb-[12px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>

        </div>
    )
}

const Create = ({ modalOpen, setModalOpen, fetchFieldData }) => {
    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} id={null} fetchFieldData={fetchFieldData} />
}

const Update = ({ modalOpen, setModalOpen, id, fetchFieldData }) => {
    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} fetchFieldData={fetchFieldData} />
}

const KhaiBaoDanhMucTinhTrangVatLy = () => {
    const [fieldData, setFieldData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const fetchFieldData = async () => {
        setIsLoading(true)
        const res = await axiosHttpService.get(API_PHYSICAL_STATE)
        const datas = res.data
        const newData = []

        for (const data of datas) {
            newData.push({
                "id": data.id,
                "code": data.code,
                "name": data.name,
                "update":
                    <span className="flex items-center justify-center">
                        <span className="text-teal-500 px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button cursor-pointer"
                            onClick={() => {
                                setId(data.id)
                                setModalOpen(true)
                            }}
                            title="Cập nhật tình trạng vật lý"
                        ><i className="fa-regular fa-pen-to-square"></i>
                        </span>
                        <Popconfirm title="Xóa tình trạng vật lý"
                            description="Bạn có chắc chắn xóa?"
                            key={GetKey()}
                            onConfirm={() => handleDelete(data.id)}
                        >
                            <span
                                className="text-[#20262E] px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button cursor-pointer"
                                title="Xóa tình trạng vật lý"
                                onClick={(e) => console.log(e)}
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </span>
                        </Popconfirm>
                    </span>
            })
        }

        setFieldData(newData)
        setIsLoading(false)
    }

    const handleDelete = async (id) => {
        try {
            await axiosHttpService.delete(API_PHYSICAL_STATE + '/' + id)
            notifySuccess("Xóa tình trạng vật lý thành công")
            fetchFieldData()
        } catch (err) {
            notifyError("Xóa tình trạng vật lý thất bại")
        }
    }

    useEffect(() => {
        fetchFieldData()
    }, [])

    return (
        <div>
            <Update
                id={id}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                fetchFieldData={fetchFieldData}
            />
            <KhaiBaoDanhMuc
                title={<Link to="/khai-bao-danh-muc/danh-muc-tinh-trang-vat-ly/"
                    className="text-black">Danh mục tình trạng vật lý</Link>}
                fieldNames={PHYSICAL_STATE} fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                Create={<Create fetchFieldData={fetchFieldData} />}
                isLoading={isLoading} />
        </div>
    )
}

export default KhaiBaoDanhMucTinhTrangVatLy
