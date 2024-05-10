/* eslint-disable react-hooks/exhaustive-deps */
import DanhMucCoQuan from "."
import { DEPARTMENT, DEPARTMENT_DECENTRALIZATION_INPUTS } from "../../../storage/StorageOffice"
import { Input, Modal, Button, Popconfirm, Spin } from "antd";
import { GetKey } from "../../../custom/Function";
import { notifyError, notifySuccess } from "../../../custom/Function";
import { useEffect, useState } from "react";
import axiosHttpService from "src/utils/httpService";
import { Link, useParams } from "react-router-dom";
import { getOrganbyId } from "./helper";
import KhaiBaoDanhMucAPIService from "src/service/api/KhaiBaoDanhMucAPIService";

const Search = Input.Search

const API_ORGAN_GET_DEPARTMENT_BY_ORGAN = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN
const API_STORAGE_GET_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN
const API_ORGAN_GET_DEPARTMENT = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT;
const Form = ({ modalOpen, setModalOpen, fetchFieldData, id = null, idOrgan = null }) => {
    const [request, setRequest] = useState({})
    const [organName, setOrganName] = useState({})

    const handleChangeRequest = (name, value) => {
        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const fetchOrgan = async () => {
            if (!idOrgan) return
            try {
                const res = await KhaiBaoDanhMucAPIService.getOrganById(idOrgan);
                setOrganName(res.name);
                handleChangeRequest("organ", idOrgan);
            } catch (err) {
                console.log(err);
            }
        }
        fetchOrgan()
    }, [idOrgan])

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const res = await KhaiBaoDanhMucAPIService.getDepartmentById(id);
                setRequest(res);
                const organ = await KhaiBaoDanhMucAPIService.getOrganById(res.organ);
                setOrganName(organ.name);
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
        if (!request) {
            notifyError("Vui lòng nhập đầy đủ thông tin")
            return
        }
        for (const input of DEPARTMENT_DECENTRALIZATION_INPUTS) {
            if (input.require && !request[input.name]) {
                notifyError("Vui lòng nhập " + input.label)
                return
            }
        }

        if (id !== null) {
            await KhaiBaoDanhMucAPIService.updateDepartment(id, request);
            notifySuccess("Cập nhật phòng ban thành công")
        } else {
            await KhaiBaoDanhMucAPIService.createDepartment(request);
            notifySuccess("Tạo phòng ban thành công")
        }
        handleChangeRequest("organ", idOrgan)
        setTimeout(() => {
            setModalOpen(false)
            fetchFieldData()
        }, 500)
    }

    return (
        <Modal
            title="Cập nhật phòng ban"
            style={{
                top: 20,
            }}
            className="w-[700px]"
            open={modalOpen}
            onCancel={handleCancle}
            footer={null}
        >

            <div>
                {DEPARTMENT_DECENTRALIZATION_INPUTS.map((input, index) => {
                    return (
                        <div className="flex mb-[30px]" key={index}>
                            <div
                                className={`w-[30%]  ${input.require === true ? "after-form" : ""}`}>
                                {input.label}
                            </div>
                            <div className="w-[70%]">
                                <Input
                                    type={input.type}
                                    name={input.name}
                                    onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)}
                                    value={input.name === 'organ' ? organName : request[input.name]}
                                    disabled={input.name === 'organ'}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-between mt-[30px]">
                <Button onClick={handleCancle}>Hủy</Button>
                <Button
                    form="tao-phong-ban"
                    type="submit"
                    className="bg-[#00f]
                    text-white" onClick={onSubmit}>
                    {id !== null ? "Cập nhật" : "Tạo"}
                </Button>
            </div>

        </Modal>
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

const Create = ({ modalOpen, setModalOpen, idOrgan, fetchFieldData }) => {
    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} idOrgan={idOrgan} fetchFieldData={fetchFieldData} />
}

const Update = ({ modalOpen, setModalOpen, id, fetchFieldData }) => {
    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} fetchFieldData={fetchFieldData} />
}

const PhongBan = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const [idOrgan, setIdOrgan] = useState(null)
    const [id, setId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [organ, setOrgan] = useState(null);
    const params = useParams();

    const fetchFieldData = async () => {
        setIsLoading(true)
        const res = await axiosHttpService.get(API_ORGAN_GET_DEPARTMENT_BY_ORGAN + '/' + params.id)
        const datas = res.data
        const newData = []
        const organData = await axiosHttpService.get(API_STORAGE_GET_ORGAN + '/' + params.id)
        for (const data of datas) {
            newData.push({
                "id": data.id,
                "name": <Link to={`./${data.id}`} className="cursor-pointer">{data.name}</Link>,
                "code": data.code,
                "organ": organData.data.name,
                // "total_staff": data.total_staff,
                "update":
                    <span className="flex items-center justify-center">
                        <span className="text-teal-500 px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button cursor-pointer "
                            onClick={() => {
                                setId(data.id)
                                setModalOpen(true)
                            }}
                            title="Cập nhật phòng ban"
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </span>

                        <Popconfirm title="Xóa phòng ban"
                            description="Bạn có chắc chắn xóa?"
                            key={GetKey()}
                            onConfirm={() => handleDelete(data.id)}
                        >
                            <span
                                className="text-[#20262E] px-[2px] font-bold italic block text-center border-none text-[16px] hover:underline icon-button cursor-pointer"
                                title="Xóa phòng ban"
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </span>
                        </Popconfirm>
                    </span>
            })
        }

        setFieldData(newData)
        setIdOrgan(params.id)
        setIsLoading(false)
    }

    const handleDelete = async (id) => {
        try {
            await axiosHttpService.delete(API_ORGAN_GET_DEPARTMENT + '/' + id)
            notifySuccess("Xóa phòng ban thành công")
            fetchFieldData()
        } catch (err) {
            notifyError("Xóa phòng ban thất bại")
        }
    }
    const fetchOrgan = async () => {
        const organ = await getOrganbyId(params.id);
        setOrgan(organ);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await Promise.all([
                fetchFieldData(),
                fetchOrgan()
            ]);
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <Spin spinning={isLoading}>
            <div>
                <DanhMucCoQuan
                    title={
                        <span>
                            <span >{organ ? organ.name : "Danh mục cơ quan"}</span> /
                            <span className="text-black"> Phòng ban </span>
                        </span>
                    }
                    breadcrumb={
                        <span>
                            <Link to="/khai-bao-danh-muc/danh-muc-co-quan/">Danh mục cơ quan</Link> /
                            <Link to={`/khai-bao-danh-muc/danh-muc-co-quan/${params.id}`}> Phòng ban </Link>
                        </span>
                    }
                    fieldNames={DEPARTMENT}
                    fieldDatas={fieldData}
                    SearchBar={<SearchBar />}
                    Create={<Create idOrgan={idOrgan} fetchFieldData={fetchFieldData} />}
                    isLoading={isLoading}
                />
                <Update
                    fetchFieldData={fetchFieldData}
                    id={id}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen} />
            </div>
        </Spin>

    )
}

export default PhongBan
