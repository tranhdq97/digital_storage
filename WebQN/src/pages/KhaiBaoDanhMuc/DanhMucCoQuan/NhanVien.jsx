/* eslint-disable react-hooks/exhaustive-deps */
import DanhMucCoQuan from "."
import { STAFF, STAFF_DECENTRALIZATION } from "../../../storage/StorageOffice"
import { Input, Modal, Button, Select, Collapse, Checkbox, Row, Col } from "antd";
import { GetKey } from "../../../custom/Function";
import { useEffect, useState } from "react";
import axiosHttpService from "src/utils/httpService";
import { notifyError, notifySuccess } from "../../../custom/Function";
import { Link, useParams } from "react-router-dom";
import { getDepartmentbyId, getOrganbyId } from "./helper";
import { ACTION_GROUP, PERMISSION_GROUP } from "src/storage/Storage";
const Search = Input.Search
const { Panel } = Collapse


const API_SINGLE_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN;
const API_ORGAN_GET_STAFF = import.meta.env.VITE_API_ORGAN_GET_STAFF
const API_ORGAN_POST_STAFF = import.meta.env.VITE_API_ORGAN_POST_STAFF
const VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN
const API_ORGAN_GET_SINGLE_DEPARTMENT = import.meta.env.VITE_API_ORGAN_GET_SINGLE_DEPARTMENT
const API_GROUP_PERMISSION = import.meta.env.VITE_API_GROUP_PERMISSION
const API_ROLE_BY_ORGAN = import.meta.env.VITE_API_ROLE_BY_ORGAN
const API_ORGAN_ROLE = import.meta.env.VITE_API_ORGAN_ROLE

const Form = ({
    modalOpen,
    setModalOpen,
    fetchFieldData,
    idOrgan,
    state,
    id = null }) => {

    const [request, setRequest] = useState({})
    const [department, setDepartment] = useState([])
    const [groupPermission, setGroupPermission] = useState([])
    const [permissionGroup, setPermissionGroup] = useState([])
    const [role, setRole] = useState([])

    useEffect(() => {
        const fetchDepartment = async () => {
            if (!idOrgan) return;
            const res = await axiosHttpService.get(VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN + '/' + idOrgan)
            const datas = res.data
            const department = []
            for (const data of datas) {
                department.push({
                    label: data.name,
                    value: data.id
                })
            }
            setDepartment(department)
        }
        const fetchRole = async () => {
            if (!idOrgan) return;
            const res = await axiosHttpService.get(API_ROLE_BY_ORGAN + '/' + idOrgan)
            const datas = res.data
            const role = []
            for (const data of datas) {
                role.push({
                    label: data.name,
                    value: data.id
                })
            }
            setRole(role)
        }

        const fetchGroupPermission = async () => {
            const res = await axiosHttpService.get(API_GROUP_PERMISSION)
            const data = res.data

            const groupPermission = data.map((item) => {
                return {
                    label: item.name,
                    value: item.name
                }
            })
            setGroupPermission(groupPermission)
        }

        fetchRole();
        fetchGroupPermission()
        fetchDepartment()
    }, [idOrgan])

    useEffect(() => {
        const fetchData = async () => {
            if (!id)
                return
            const res = await axiosHttpService.get(API_ORGAN_GET_STAFF + '/' + id)
            const data = res.data

            setRequest(data)
            setPermissionGroup(data.permission_group)
        }
        fetchData()
    }, [id, modalOpen])

    const handleCancle = () => {
        setModalOpen(false)
    }

    const handleChangeRequest = (name, value) => {
        console.log(name, value);
        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangePermission = (value) => {
        if (permissionGroup.includes(value)) {
            handleChangeRequest("permission_group", permissionGroup.filter((item) => item !== value))
            setPermissionGroup(prev => prev.filter((item) => item !== value))
        } else {
            handleChangeRequest("permission_group", [...permissionGroup, value])
            setPermissionGroup(prev => [...prev, value])
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!request) {
            notifyError("Vui lòng nhập đầy đủ thông tin")
            return
        }

        if (request["is_staff"] === undefined || request["is_staff"] === null) request["is_staff"] = true;
        if (request["role"] === undefined) request["role"] = null;
        for (const input of STAFF_DECENTRALIZATION) {
            if (input.require && !request[input.name]) {
                notifyError("Vui lòng nhập " + input.label)
                return
            }
        }


        request["menu_permission"] = request["permission"] + "-" + request["action"];
        delete request["permission"];
        delete request["action"];

        if (id !== null) {
            await axiosHttpService.put(API_ORGAN_POST_STAFF + '/' + id, request)
            notifySuccess("Cập nhật nhân viên thành công")
        } else {
            await axiosHttpService.post(API_ORGAN_POST_STAFF, request)
            notifySuccess("Tạo nhân viên thành công")
        }

        setRequest({})
        setTimeout(() => {
            setModalOpen(false)
            fetchFieldData()
        }, 500)
    }

    return (
        <Modal
            title={state === "update" ? "Cập nhật nhân viên" : "Tạo nhân viên"}
            style={{
                top: 20,
            }}
            className="w-[600px]"
            open={modalOpen}
            onCancel={handleCancle}
            footer={null}
        >
            <form id="tao-nhan-vien">
                <div>
                    {STAFF_DECENTRALIZATION.map((input, index) => {
                        return (
                            <div className="flex mb-[30px]" key={index}>
                                <div className={`w-[30%]  ${input.require === true ? "after-form" : ""}`}>
                                    {input.label}
                                </div>
                                <div className="w-[70%]">
                                    {input.type === "select" ?
                                        <Select
                                            disabled={state === "read"}
                                            className="w-full"
                                            value={request[input.name]}
                                            name={input.name}
                                            options={input.name === "department" ?
                                                department :
                                                input.name === "role" ?
                                                    role :
                                                    input.name === "permission" ?
                                                        PERMISSION_GROUP :
                                                        ACTION_GROUP

                                            }
                                            onChange={(ev) => handleChangeRequest(input.name, ev)} /> :
                                        input.type === "checkbox" ?
                                            <Checkbox
                                                onChange={(ev) => handleChangeRequest(input.name, !ev.target.checked)}
                                            /> :
                                            <Input
                                                disabled={state === "read"}
                                                type={input.type}
                                                name={input.name}
                                                onChange={(ev) => handleChangeRequest(ev.target.name, ev.target.value)}
                                                value={request[input.name]}
                                            />

                                    }
                                </div>
                            </div>
                        )
                    })}

                </div>
                {
                    <div className="flex justify-between mt-[30px]">
                        <Button onClick={handleCancle}>Hủy</Button>
                        <Button form="tao-nhan-vien" type="submit" className="bg-[#00f] text-white" onClick={onSubmit}>
                            {state === "update" ? "Cập nhật" : "Tạo"}
                        </Button>
                    </div>
                }
            </form>
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

const Create = ({ modalOpen, setModalOpen, idOrgan, idOrganDepartment, fetchFieldData }) => {
    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} idOrgan={idOrgan} idOrganDepartment={idOrganDepartment} fetchFieldData={fetchFieldData} />
}

const Update = ({
    modalOpen,
    setModalOpen,
    id,
    fetchFieldData,
    idOrgan }) => {

    return <Form modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} fetchFieldData={fetchFieldData} idOrgan={idOrgan} state="update" />
}

const Read = ({
    modalOpenRead,
    setModalOpenRead,
    id,
    fetchFieldData,
    idOrgan }) => {

    return <Form modalOpen={modalOpenRead} setModalOpen={setModalOpenRead} id={id} fetchFieldData={fetchFieldData} idOrgan={idOrgan} state="read" />
}

const NhanVien = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fieldData, setFieldData] = useState([])
    const [id, setId] = useState(null)
    const [idOrgan, setIdOrgan] = useState(null)
    const [idOrganDepartment, setIdOrganDepartment] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpenRead, setModalOpenRead] = useState(false)
    const [organ, setOrgan] = useState(null);
    const params = useParams()
    const [department, setDepartment] = useState(null);

    const fetchFieldData = async () => {
        setIsLoading(true)
        const res = await axiosHttpService.get(API_ORGAN_GET_STAFF + '/' + params.department_id)
        const datas = res.data
        console.log("params: ", params)
        const newData = []
        const organData = await axiosHttpService.get(API_SINGLE_ORGAN + '/' + params.organ_id)
        const departmentData = await axiosHttpService.get(API_ORGAN_GET_SINGLE_DEPARTMENT + '/' + params.department_id)
        for (const data of datas) {
            let roleStr = "Chưa có vai trò"
            if (data.role !== null) {
                let roleData = await axiosHttpService.get(API_ORGAN_ROLE + '/' + data.role);
                roleStr = roleData.data.name;
            }
            // if (data.department_id !== params.department_id) continue
            newData.push({
                "id": data.id,
                "name": data.full_name,
                "email": data.email,
                "phone": data.phone,
                "organ": organData.data.name,
                "department": departmentData.data.name,
                "role": roleStr,
                // "update": <span className="cursor-pointer" onClick={() => {
                //     setModalOpen(true)
                //     setId(data.id)
                // }}><i className="fa-regular fa-pen-to-square"></i></span>
            })
        }

        setFieldData(newData)
        setIdOrgan(params.organ_id)
        setIdOrganDepartment(params.department_id)
        setIsLoading(false)
    }

    const fetchDepartment = async () => {
        const department = await getDepartmentbyId(params.department_id);
        setDepartment(department);
    }

    const fetchOrgan = async () => {
        const organ = await getOrganbyId(params.organ_id);
        setOrgan(organ);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await Promise.all([
                fetchFieldData(),
                fetchOrgan(),
                fetchDepartment()
            ]);
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <div>
            <DanhMucCoQuan
                title={
                    <span>
                        <span>{organ ? organ.name : "Danh mục cơ quan"}</span> /
                        <span> {department ? department.name : "Phòng ban"} </span> /
                        <span className="text-black"> Nhân viên </span>
                    </span>
                }
                breadcrumb={
                    <span>
                        <Link to="/khai-bao-danh-muc/danh-muc-co-quan/">Danh mục cơ quan</Link> /
                        <Link to={`/khai-bao-danh-muc/danh-muc-co-quan/${params.organ_id}`}> Phòng ban </Link> /
                        <span className="text-black"> Nhân viên </span>
                    </span>
                }
                fieldNames={STAFF}
                fieldDatas={fieldData}
                SearchBar={<SearchBar />}
                Create={<Create idOrgan={idOrgan} idOrganDepartment={idOrganDepartment} fetchFieldData={fetchFieldData} />}
                isLoading={isLoading}
            />

            <Update
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                id={id}
                fetchFieldData={fetchFieldData}
                idOrgan={params.organ_id}
            />
            <Read
                modalOpenRead={modalOpenRead}
                setModalOpenRead={setModalOpenRead}
                id={id}
                idOrgan={params.organ_id}

            >
            </Read>
        </div>

    )
}

export default NhanVien
