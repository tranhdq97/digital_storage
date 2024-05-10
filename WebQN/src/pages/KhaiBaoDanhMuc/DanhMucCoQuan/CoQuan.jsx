/* eslint-disable react-hooks/exhaustive-deps */
import DanhMucCoQuan from "."

import { ORGAN, ORGAN_DECENTRALIZATION_INPUTS } from "../../../storage/StorageOffice"
import { Input, Modal, Button, Switch, Select, Popconfirm } from "antd";
import { GetKey, notifyError, notifySuccess } from "../../../custom/Function";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import axiosHttpService, { axiosCorsService } from "src/utils/httpService";
import { Link } from "react-router-dom";
import KhaiBaoDanhMucAPIService from "src/service/api/KhaiBaoDanhMucAPIService";

const Search = Input.Search
const API_STORAGE_POST_ORGAN = import.meta.env.VITE_API_STORAGE_POST_ORGAN
const API_STORAGE_GET_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL

const API_PROVINCES = import.meta.env.VITE_API_PROVINCES
const API_DISTRICTS = import.meta.env.VITE_API_DISTRICTS
const API_WARD = import.meta.env.VITE_API_WARD

const Form = ({ modalOpen, setModalOpen, id, fetchFieldData }) => {
    const [request, setRequest] = useState({
        storage: false
    })
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [organ, setOrgan] = useState(null);
    const handleChangeRequest = (name, value) => {
        const getNameProvince = (code) => {
            if (!code) return null
            const province = provinces.find((item) => item.code === code)
            return province.name
        }

        const getNameDistrict = (code) => {
            if (!code) return null
            const district = districts.find((item) => item.code === code)
            return district.name
        }

        const getNameWard = (code) => {
            if (!code) return null
            const ward = wards.find((item) => item.code === code)
            return ward.name
        }

        if (name === "province") {
            setRequest(prev => ({
                ...prev,
                provinceName: getNameProvince(value)
            }))
        }

        if (name === "district") {
            setRequest(prev => ({
                ...prev,
                districtName: getNameDistrict(value)
            }))
        }
        if (name === "ward") {
            setRequest(prev => ({
                ...prev,
                wardName: getNameWard(value)
            }))
        }

        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }


    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const res = await axiosHttpService.get(API_STORAGE_GET_ORGAN + '/' + id)
                setOrgan(res.data);
                setRequest(res.data);
                
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [id])

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await axiosCorsService.get(API_PROVINCES)
            const data = res.data
            data.forEach((item) => {
                item.label = item.name
                item.value = item.code
            })
            setProvinces(data)
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchDistricts = async () => {
            if (!request.province) return;
            
            if(organ && request.province !== organ.province) {
                handleChangeRequest("district", null);
                handleChangeRequest("ward", null);
            }

            setDistricts([])
            setWards([])

            try {
                const res = await axiosCorsService.get(API_DISTRICTS.replace("IDPROVINCE", request.province))
                const data = res.data.districts
                data.forEach((item) => {
                    item.label = item.name
                    item.value = item.code
                })
                setDistricts(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchDistricts()
    }, [request.province])

    useEffect(() => {
        const fetchWards = async () => {
            if (!request.district) return;
            if(organ && request.district !== organ.district) {
                handleChangeRequest("ward", null)
            }
            setWards([]);
            try {
                const res = await axiosCorsService.get(API_WARD.replace("IDDISTRICT", request.district))
                const data = res.data.wards
                data.forEach((item) => {
                    item.label = item.name
                    item.value = item.code
                })
                setWards(res.data.wards)
            } catch (err) {
                console.log(err)
            }
        }
        fetchWards()
    }, [request.district])

    const handleCancel = () => {
        setModalOpen(false)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (request === null) {
            notifyError("Vui lòng điền đầy đủ thông tin")
            return
        }

        for (const input of ORGAN_DECENTRALIZATION_INPUTS) {
            if (input.require && !request[input.name]) {
                notifyError("Vui lòng nhập " + input.label)
                return
            }
        }
        if (id !== null) {
            await axiosHttpService.put(API_STORAGE_POST_ORGAN + '/' + id, request)
            notifySuccess("Cập nhật cơ quan thành công")
        } else {
            await axiosHttpService.post(API_STORAGE_POST_ORGAN, request)
            notifySuccess("Tạo cơ quan thành công")
        }

        setTimeout(() => {
            setModalOpen(false)
            fetchFieldData()
        }, 500)
    }

    return (
        <Modal
            title="Tạo cơ quan"
            style={{
                top: 20,
            }}
            className="w-[600px]"
            open={modalOpen}
            onCancel={handleCancel}
            footer={null}
        >

            {ORGAN_DECENTRALIZATION_INPUTS.map((input, index) => {
                return (
                    <div className="flex mb-[30px]">
                        <div className={`w-[30%]  ${input.require === true ? "after-form" : ""}`}>
                            {input.label}
                        </div>
                        <div className="w-[70%]">
                            {input.type === "textarea" ?
                                <TextArea
                                    name={input.name}
                                    value={request[input.name]}
                                    onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)}
                                />
                                : input.type === "switch" ?
                                    <Switch
                                        name={input.name}
                                        onChange={(ev) => handleChangeRequest("storage", ev)}
                                    />
                                    :
                                    input.type === "select" ?
                                        <Select
                                            name={input.name}
                                            options={input.name === "province" ? provinces :
                                                input.name === "district" ? districts : wards}
                                            onChange={(ev) => handleChangeRequest(input.name, ev)}
                                            className="w-full"
                                            value={ 
                                                input.name === 'province'? request.provinceName :
                                                input.name === 'district'? request.districtName :
                                                input.name === 'ward'? request.wardName :
                                                request[input.name]
                                            } 
                                            />
                                        : <Input
                                            type={input.type} name={input.name}
                                            defaultValue={request[input.name]}
                                            onChange={(ev) =>
                                                handleChangeRequest(ev.target.name, ev.target.value)
                                            }
                                            value={request[input.name]}
                                        />
                            }
                        </div>
                    </div>
                )
            })}

            <div className="flex justify-end">
                <Button className="mr-[10px]"
                    onClick={handleCancel}>Hủy</Button>
                <Button
                    type="submit"
                    className="bg-[#00f] text-white"
                    form="tao-co-quan"
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

const CoQuan = () => {
    const [fieldData, setFieldData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchFieldData = async () => {
        setIsLoading(true)
        const res = await axiosHttpService.get(API_STORAGE_GET_ORGAN)
        const datas = res.data
        const newData = []

        for (const data of datas) {
            newData.push({
                "id": data.id,
                "name": <Link to={`./${data.id}`} className="cursor-pointer">{data.name}</Link>,
                "code": data.code,
                "address": data.address,
                "phone": data.phone,
                "fax": data.fax,
                "provinceName": data.provinceName,
                "districtName": data.districtName,
                "wardName": data.wardName,
                "update":
                    <span className="flex items-center justify-center">
                        <span className="text-teal-500 px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button cursor-pointer"
                            onClick={() => {
                                setId(data.id)
                                setModalOpen(true)
                            }}
                            title="Cập nhật phòng ban"
                        ><i className="fa-regular fa-pen-to-square"></i>
                        </span>
                        <Popconfirm title="Xóa cơ quan"
                            description="Bạn có chắc chắn xóa?"
                            key={GetKey()}
                            onConfirm={() => handleDelete(data.id)}
                        >
                            <span
                                className="text-[#20262E] px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button cursor-pointer"
                                title="Xóa cơ quan"
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
            await KhaiBaoDanhMucAPIService.deleteOrgan(id);
            notifySuccess("Xóa cơ quan thành công")
            fetchFieldData()
        } catch (err) {
            notifyError("Xóa cơ quan thất bại")
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
            <DanhMucCoQuan
                title={<span
                    className="text-black">Danh mục cơ quan</span>}
                breadcrumb={<Link to="/khai-bao-danh-muc/danh-muc-co-quan/"
                    className="text-black">Danh mục cơ quan</Link>}
                fieldNames={ORGAN} fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                Create={<Create fetchFieldData={fetchFieldData} />}
                isLoading={isLoading} />
        </div>
    )
}

export default CoQuan
