/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DanhMucKhoLuuTru from ".";
import axiosHttpService from "src/utils/httpService";
import { WARE_HOUSE_ROOM } from "../../../storage/StorageStorage";
import { Input, Select, Modal, Button, Popconfirm } from "antd";
import KhaiBaoDanhMucAPIService from "src/service/api/KhaiBaoDanhMucAPIService";


const API_STORAGE_GET_WAREHOUSEROOM_ALL = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSEROOM_ALL
const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL
const API_STORAGE_DELETE_WAREHOUSEROOM = import.meta.env.VITE_API_STORAGE_DELETE_WAREHOUSEROOM
const API_STORAGE_PUT_WAREHOUSEROOM = import.meta.env.VITE_API_STORAGE_PUT_WAREHOUSEROOM
const API_STORAGE_GET_WAREHOUSE_ALL = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSE_ALL

const Search = Input.Search


const Create = ({ modalOpen, setModalOpen, optionOrgan, reFetchData, allWarehouse }) => {
    const [optionWarehouse, setOptionWarehouse] = useState([])
    const [request, setRequest] = useState({
        name: null,
        organ: null,
        warehouse: null,
        state: true
    })

    const handleChangeRequest = (name, value) => {
        return setRequest((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleOk = async () => {
        await axiosHttpService.post(API_STORAGE_GET_WAREHOUSEROOM_ALL, request)
        setModalOpen(false)
        reFetchData()

    }

    useEffect(() => {
        const getWarehouseByOrgan = async () => {
            if (!request['organ'])
                return setOptionWarehouse([])
            const warehouse = await KhaiBaoDanhMucAPIService.getWarehouseByOrganId(request.organ);
            const raws = []
            for (const data of warehouse) {
                const raw = {}
                raw["value"] = data["id"]
                raw["label"] = data["name"]
                raws.push(raw)
            }
            setOptionWarehouse(raws)
        }
        getWarehouseByOrgan();
    }, [request['organ']])


    const handleCancel = () => {
        setModalOpen(false)
    }

    return (
        <Modal
            title="Tạo phòng kho mới"
            style={{
                top: 20,
            }}
            open={modalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div>
                <div className="flex justify-between py-[12px]">
                    <span>Tên</span>
                    <Input name="name" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Cơ quan</span>
                    <Select
                        name="organ"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn cơ quan"
                        optionFilterProp="children"
                        onChange={(value) => {
                            handleChangeRequest('organ', value)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionOrgan}
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Kho</span>
                    <Select
                        name="organ"
                        className="w-[70%] bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn kho"
                        optionFilterProp="children"
                        onChange={(value) => {
                            handleChangeRequest('warehouse', value)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouse}
                    />
                </div>
            </div>
        </Modal>
    )
}

const SearchBar = ({ optionOrgan, allWarehouse }) => {
    const [optionWarehouse, setOptionWarehouse] = useState([])

    const handleChangeOptionOrgan = (value) => {

        const optionWarehouse = []
        for (const warehouse of allWarehouse) {
            if (warehouse.par === value) {
                optionWarehouse.push({
                    value: warehouse.value,
                    label: warehouse.label
                })
            }
        }
        setOptionWarehouse(optionWarehouse)
    }

    return (
        <div className="mx-[24px] mt-[8px] flex">

            <div className="bg-white p-[12px] w-[300px] max-w-[20%]">
                <p className="mb-[12px]">Tìm kiếm</p>
                <Search placeholder="Tìm kiếm" onSearch={(ev) => console.log(ev)} enterButton />
            </div>

            <div className="bg-white p-[12px] w-[300px] max-w-[20%] ml-[20px]">
                <p className="mb-[12px]">Cơ quan</p>
                <div>
                    <Select
                        name="state"
                        className="w-full bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn cơ quan"
                        optionFilterProp="children"
                        onChange={(value) => handleChangeOptionOrgan(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionOrgan}
                    ></Select>
                </div>
            </div>

            <div className="bg-white p-[12px] w-[300px] max-w-[20%] ml-[20px]">
                <p className="mb-[12px]">Kho</p>
                <div>
                    <Select
                        name="state"
                        className="w-full bg-white outline-none rounded-md"
                        showSearch
                        allowClear
                        placeholder="Chọn kho"
                        optionFilterProp="children"
                        onChange={(value) => console.log(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionWarehouse}
                    ></Select>
                </div>
            </div>
        </div>
    )
}

const Update = ({ reFetchData, id }) => {
    const [request, setRequest] = useState({
        name: null,
    })
    const [modalOpen, setModalOpen] = useState(false)

    const handleChangeRequest = (name, value) => {
        return setRequest({
            ...request,
            [name]: value
        })
    }

    const handleClick = () => {
        setModalOpen(true)
    }
    const handleOk = async () => {
        if (request.name !== null)
            await axiosHttpService.put(API_STORAGE_PUT_WAREHOUSEROOM + id, request)
        setModalOpen(false)
        reFetchData()
    }

    const handleCancle = () => {
        setModalOpen(false)
    }

    return (
        <div>
            <Button onClick={handleClick} className='border-none'>
                <i className="fa-regular fa-pen-to-square"></i>
            </Button>
            <Modal open={modalOpen}
                title="Sửa tên phòng kho"
                onOk={handleOk}
                onCancel={handleCancle}>
                <div className='flex justify-between items-center' >
                    <span>Tên</span>
                    <Input onChange={(e) => handleChangeRequest('name', e.target.value)} className='w-[70%]' />
                </div>
            </Modal>
        </div>
    )
}

const Delete = ({ id, reFetchData }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        const deleteWarehouse = async () => {
            const res = await axiosHttpService.delete(API_STORAGE_DELETE_WAREHOUSEROOM + id)
            console.log(res)
        }

        deleteWarehouse()
        setTimeout(async () => {
            await reFetchData()
        }, 500)

        setOpen(false)
    }

    useEffect(() => {
        const popupContainer = document.querySelectorAll(".ant-popover.ant-popconfirm.css-dev-only-do-not-override-1fviqcj.css-dev-only-do-not-override-1fviqcj.ant-popover-placement-top")[0]

        if (popupContainer === undefined)
            return

        const buttonAccepts = document.querySelectorAll(".ant-popconfirm-buttons > .ant-btn-primary")
        buttonAccepts.forEach((buttonCancel) => {
            buttonCancel.textContent = "Xóa"
        })

        const buttonCancels = document.querySelectorAll(".ant-popconfirm-buttons > .ant-btn-default ")
        buttonCancels.forEach((buttonAccept) => {
            buttonAccept.textContent = "Hủy"
        })
    }, [open])

    return (
        <Popconfirm title="Xóa phòng kho"
            open={open}
            description="Bạn có chắc chắn xóa?"
            onConfirm={handleConfirm}
            onCancel={handleClose}
        >
            <Button className='border-none' onClick={() => { setOpen(true) }} title="Xóa">
                <i className="fa-solid fa-trash-can"></i>
            </Button>
        </Popconfirm>
    )
}

const WareHouseRoom = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [wareHouseRoom, setWareHouseRoom] = useState([])
    const [optionOrgan, setOptionOrgan] = useState([])
    const [optionWarehouse, setOptionWarehouse] = useState([])

    const reFetchData = () => {
        const fetchWareHouseRoom = async () => {
            setIsLoading(true)
            const response = await axiosHttpService.get(API_STORAGE_GET_WAREHOUSEROOM_ALL)
            const rawDatas = response.data
            let filesArray = []
            for (const rawData of rawDatas) {
                const warehouse = await KhaiBaoDanhMucAPIService.getWarehouseById(rawData.warehouse);
                const organ = await KhaiBaoDanhMucAPIService.getOrganById(warehouse.organ);
                const row = {
                    'id': rawData.id,
                    'name': rawData.name,
                    'organ': organ.name,
                    'warehouse': warehouse.name,
                    'state': <button>{
                        rawData['state'] === true ? "Mở" : "Đóng"
                    }</button>,
                    'update': <Update id={rawData.id} reFetchData={reFetchData} />,
                    'delete': <Delete id={rawData.id} reFetchData={reFetchData} />
                }
                filesArray.push(row)
            }
            setWareHouseRoom(filesArray)
            setIsLoading(false)
        }

        const fetchOrgan = async () => {
            setIsLoading(true)

            const response = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL)
            const raws = []

            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["id"]
                raw["label"] = data["name"]
                raws.push(raw)
            }

            setOptionOrgan(raws)
            setIsLoading(false)
        }

        const fetchWarehouse = async () => {
            setIsLoading(true)
            const response = await axiosHttpService.get(API_STORAGE_GET_WAREHOUSE_ALL)
            const raws = []
            for (const data of response.data) {
                const raw = {}
                raw["value"] = data["id"]
                raw["label"] = data["name"]
                raw["par"] = data["organId"]
                raws.push(raw)
            }

            setOptionWarehouse(raws)
            setIsLoading(false)
        }

        fetchWareHouseRoom()
        fetchOrgan()
        fetchWarehouse()
    }

    useEffect(() => {
        reFetchData()
    }, [])

    return (
        <DanhMucKhoLuuTru title="Phòng kho" fieldNames={WARE_HOUSE_ROOM} fieldDatas={wareHouseRoom} isLoading={isLoading} SearchBar={<SearchBar optionOrgan={optionOrgan} allWarehouse={optionWarehouse} />} Create={<Create optionOrgan={optionOrgan} reFetchData={reFetchData} allWarehouse={optionWarehouse} />} />
    )
}

export default WareHouseRoom
