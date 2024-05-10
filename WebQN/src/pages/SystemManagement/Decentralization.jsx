/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input } from "antd";
import Search from "antd/es/input/Search";
import { Checkbox, Col, Row, Popover } from "antd";
import { useEffect, useState } from "react";
import { Table } from "../../custom/Components"
import { LIST_PERMISSION } from "../../storage/Storage";
import { GetKey, notifyError, notifySuccess } from "../../custom/Function";
import axiosHttpService from "src/utils/httpService";
import { DEPARTMENT_DECENTRALIZATION_COLLASPE } from "../../storage/StorageOffice";
import { GROUP_PERMISSION_FIELD } from "../../storage/GroupPermission";


const API_GROUP_PERMISSION = import.meta.env.VITE_API_GROUP_PERMISSION
const API_USER_PERMISSION = import.meta.env.VITE_API_USER_PERMISSION

const KEY_GROUP_PERMISSION = {
    coquan_create: "Tạo cơ quan",
    coquan_read: "Xem cơ quan",
    coquan_update: "Chỉnh sửa cơ quan",
    coquan_delete: "Xóa cơ quan",
    phongban_create: "Tạo phòng ban",
    phongban_read: "Xem phòng ban",
    phongban_update: "Chỉnh sửa phòng ban",
    phongban_delete: "Xóa phòng ban",
    nhanvien_create: "Tạo nhân viên",
    nhanvien_read: "Xem nhân viên",
    nhanvien_update: "Chỉnh sửa nhân viên",
    nhanvien_delete: "Xóa nhân viên",
    kho_create: "Tạo kho",
    kho_read: "Xem kho",
    kho_update: "Chỉnh sửa kho",
    kho_delete: "Xóa kho",
    hoso_create: "Tạo hồ sơ",
    hoso_read: "Xem hồ sơ",
    hoso_update: "Chỉnh sửa hồ sơ",
    hoso_delete: "Xóa hồ sơ",
    hoso_changestate: "Thay đổi trạng thái hồ sơ"
}

const columns = [
    {
        title: 'Tên người dùng',
        width: "100%"

    },
    {
        title: 'Email',
        width: "100%"

    },
    {
        title: 'Tên',
        width: "100%"

    },
    {
        title: 'Họ',
        width: "100%"

    },
    {
        title: 'Trạng thái',
        width: "100%"

    },
];

const GroupChange = ({ setStateGroupChange, stateGroupChange, reFetchGroups }) => {
    const group = stateGroupChange === null ? null : stateGroupChange.group
    const state = stateGroupChange === null ? null : stateGroupChange.state

    const [permission, setPermission] = useState(group === null ? [] : group.permissions)
    const [request, setRequest] = useState(group === null ? {} : { name: group.name, permissions: group.permissions })

    const handleChangeRequest = (name, value) => {
        setRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePermission = (value) => {
        const index = permission.findIndex((item) => item === value)
        if (index === -1) {
            setPermission(prev => {
                handleChangeRequest("permissions", [...prev, value])
                return [...prev, value]
            })
        }
        else {
            setPermission(prev => {
                handleChangeRequest("permissions", prev.filter((item) => item !== value))
                return prev.filter((item) => item !== value)
            })
        }
    }

    const handleSubmitGroupPermission = async (e) => {
        e.preventDefault()
        if (state === "ADD_GROUP") {
            await axiosHttpService.post(API_GROUP_PERMISSION, request)
            notifySuccess("Thêm nhóm thành công")
            setTimeout(() => {
                reFetchGroups()
            }, 300)
        } else {
            await axiosHttpService.put(API_GROUP_PERMISSION + group.id, request)
            notifySuccess("Thay đổi nhóm thành công")
            setTimeout(() => {
                reFetchGroups()
            }, 300)
        }
    }

    const handleDeleteGroupPermission = () => {
        try {
            axiosHttpService.delete(API_GROUP_PERMISSION + group.id)
            notifySuccess("Xóa nhóm thành công")
            setTimeout(() => {
                reFetchGroups()
            }, 500)
        } catch (e) {
            notifyError("Đã có lỗi xảy ra")
        }
    }

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="font-medium text-[20px]">{state === "ADD_GROUP" ? "Thêm nhóm" : "Thay đổi nhóm"}</h2>
                <Button onClick={() => setStateGroupChange(null)}>Đóng</Button>

            </div>

            <div className="mt-[12px]">
                <h2 className="font-medium text-[16px]">{group === null ? "" : group.name}</h2>
            </div>

            <div>
                <div className="flex mt-[8px]">
                    <p className="w-[25%]">Tên nhóm: </p>
                    <Input value={request["name"]} name="name" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} className="w-[75%]" />
                </div>
            </div>
            <div>
                <div className="flex mt-[8px]">
                    <p className="w-[25%]">Quyền: </p>
                    <div className="bg-white p-[16px] rounded-[10px] mx-[auto] w-[75%]">
                        {DEPARTMENT_DECENTRALIZATION_COLLASPE.map((item) => {
                            return (
                                <div className="mt-[8px] flex-col w-full">
                                    <div className="font-bold">{item.label}</div>
                                    <Row>
                                        {item.permission.map((option) => {
                                            return (
                                                <Col span={12} key={GetKey()} className="mt-[8px]">
                                                    <Checkbox checked={
                                                        permission.findIndex((item) => item === option.value) !== -1
                                                    } name="permission" onChange={(e) => {
                                                        console.log(e)
                                                        handlePermission(e.target.value)
                                                    }
                                                    } value={option.value}>{option.label}</Checkbox>
                                                </Col>
                                            )
                                        }
                                        )}
                                    </Row>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-[16px] mb-[20px]">
                {
                    group !== null ?
                        <Button className="mr-[12px]" danger onClick={handleDeleteGroupPermission}>Xóa</Button>
                        : ""
                }
                <Button onClick={handleSubmitGroupPermission}>Lưu</Button>
            </div>
        </div>
    )
}

const Group = ({ stateGroup, setStateGroup }) => {
    const [stateGroupChange, setStateGroupChange] = useState(null)
    const [fieldDatas, setFieldDatas] = useState([])

    const HoverPermission = ({ permission }) => {
        const content = (
            <div>
                {permission.map((item) => {
                    return (
                        <div className="w-[100%]">{item}</div>
                    )
                })}
            </div>

        )
        return (
            <Popover content={content} title="Phân quyền">
                <div className="relative">
                    <span className="cursor-pointer" >
                        <i className="fa-regular fa-user">
                        </i></span>
                </div>
            </Popover>
        )
    }

    const reFetchGroups = async () => {
        const response = await axiosHttpService.get(API_GROUP_PERMISSION)
        const datas = response.data
        const newData = []

        const getNamePermissions = (permissions) => {
            const permissionsName = []
            for (const permission of permissions) {
                permissionsName.push(KEY_GROUP_PERMISSION[permission])
            }
            return permissionsName
        }

        for (const data of datas) {

            newData.push({
                id: data.id,
                name: data.name,
                permissions: <HoverPermission permission={getNamePermissions(data.permissions)} />,
                update: <span className="cursor-pointer" onClick={() => setStateGroupChange({ state: "UPDATE_GROUP", group: { id: data.id, permissions: data.permissions, name: data.name } })}><i className="fa-regular fa-pen-to-square"></i></span>
            })
        }

        setFieldDatas(newData)
    }

    useEffect(() => {
        reFetchGroups()
    }, [])


    return (
        stateGroup &&
        <div className="w-full pl-[24px]">
            {stateGroupChange === null ? <div>
                <div className="flex justify-between">
                    <h2 className="font-medium text-[20px]">Chọn nhóm để thay đổi</h2>
                    <Button onClick={() => setStateGroupChange({ state: "ADD_GROUP", group: null })}>Thêm nhóm +</Button>
                </div>
                <div className="mt-[12px]">
                    <Search allowClear placeholder="Nhập tên group" enterButton />
                </div>
                <div>

                    <div className="py-[4px] border-b-4 font-medium cursor-pointer">
                        Nhóm
                    </div>

                    <Table fieldNames={GROUP_PERMISSION_FIELD} fieldDatas={fieldDatas} />
                </div>
            </div>
                :
                <GroupChange stateGroupChange={stateGroupChange} setStateGroupChange={setStateGroupChange} reFetchGroups={reFetchGroups} />}
        </div>
    )
}

const CreateUser = ({ setStateUserChange, reFetchUser }) => {
    const [confirmPassword, setConfirmPassword] = useState("")

    const [request, setRequest] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: ""
    })

    const handleChangeRequest = (e) => {
        const { name, value } = e.target
        setRequest({ ...request, [name]: value })
    }

    const handleChangeConfirmPassword = (e) => {
        const { value } = e.target
        setConfirmPassword(value)
    }

    const handleSubmit = () => {
        if (request.username.length === 0) {
            notifyError("Vui lòng nhập tên người dùng")
            return
        }
        if (request.password.length === 0) {
            notifyError("Vui lòng nhập mật khẩu")
            return
        }
        if (request.password !== confirmPassword) {
            notifyError("Mật khẩu không khớp")
            return
        }
        try {
            axiosHttpService.post(API_USER_PERMISSION, request)
            notifySuccess("Tạo người dùng thành công")
            setTimeout(() => {
                reFetchUser()
            }, 300)
        } catch (e) {
            notifyError("Tạo người dùng thất bại")
        }
    }

    return (
        <div className="mb-[50px]">
            <div className="flex justify-between">
                <h2 className="font-medium text-[20px]">Thêm người dùng</h2>
                <Button onClick={() => setStateUserChange(null)}>Đóng</Button>

            </div>


            <div>
                <div className="mt-[16px] flex justify-between">
                    <p>Tên người dùng</p>
                    <Input name="username" className="w-[70%]" onChange={handleChangeRequest} allowClear />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Mật khẩu</p>
                    <Input name="password" className="w-[70%]" onChange={handleChangeRequest} type="password" allowClear />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Xác nhận mật khẩu</p>
                    <Input className="w-[70%]" type="password" allowClear onChange={handleChangeConfirmPassword} />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Tên</p>
                    <Input name="first_name" className="w-[70%]" onChange={handleChangeRequest} allowClear />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Họ</p>
                    <Input name="last_name" className="w-[70%]" onChange={handleChangeRequest} allowClear />
                </div>
                <div className="mt-[16px] flex justify-between">
                    <p>Email</p>
                    <Input name="email" className="w-[70%]" onChange={handleChangeRequest} allowClear />
                </div>
            </div>

            <div className="flex justify-end mt-[12px]" onClick={handleSubmit}>
                <Button>Lưu</Button>
            </div>
        </div>
    )
}

const UserChange = ({ setStateUserChange, stateUserChange, reFetchUser, LIST_GROUP }) => {
    const [chosenPermission, setChosenPermission] = useState([])
    const [selectPermission, setSelectPermission] = useState([])
    const [selectAddedPermission, setSelectAddedPermission] = useState([])
    const [choosePermission, setChoosePermission] = useState([])


    const [chosenGroup, setChosenGroup] = useState([])
    const [selectGroup, setSelectGroup] = useState([])
    const [selectAddedGroup, setSelectAddedGroup] = useState([])
    const [chooseGroup, setChooseGroup] = useState([])


    const user = stateUserChange === null ? null : stateUserChange.user

    useEffect(() => {
        const getGroupPermission = () => {
            if (user !== null) {
                setChosenPermission(user.permission)
                const newPermission = LIST_PERMISSION.filter((item) => !user.permission.some((i) => i.id === item.id))
                setChoosePermission(newPermission)
            } else setChoosePermission(LIST_PERMISSION)
        }

        const getGroup = () => {
            if (user !== null) {
                setChosenGroup(user.group)
                const newGroup = LIST_GROUP.filter((item) => !user.group.some((i) => i.id === item.id))
                setChooseGroup(newGroup)
            } else setChooseGroup(LIST_GROUP)
        }

        getGroup()
        getGroupPermission()
    }, [user])

    console.log(user)
    const handleSelectPermission = (id) => {
        if (selectPermission.includes(id)) {
            setSelectPermission(selectPermission.filter((i) => i !== id))
        } else {
            setSelectPermission([...selectPermission, id])
        }
    }

    const handleSelectAddedPermission = (id) => {
        if (selectAddedPermission.includes(id)) {
            setSelectAddedPermission(selectAddedPermission.filter((i) => i !== id))
        } else {
            setSelectAddedPermission([...selectAddedPermission, id])
        }
    }

    const handleAddPermission = () => {
        const selectedPermisson = LIST_PERMISSION.filter((item) => selectPermission.includes(item.id))
        setChosenPermission((prev) => {
            const newPermission = prev.concat(selectedPermisson)
            return newPermission
        })

        setChoosePermission((prev) => {
            const newPermission = prev.filter((item) => !selectPermission.includes(item.id))
            return newPermission
        })

        setSelectPermission([])
    }

    const handleRemovePermission = () => {
        const selectedPermisson = chosenPermission.filter((item) => selectAddedPermission.includes(item.id))
        setChoosePermission((prev) => {
            const newPermission = prev.concat(selectedPermisson)
            return newPermission
        })
        setChosenPermission((prev) => {
            const newPermission = prev.filter((item) => !selectAddedPermission.includes(item.id))
            return newPermission
        })
        setSelectAddedPermission([])
    }

    const handleSelectGroup = (id) => {
        if (selectGroup.includes(id)) {
            setSelectGroup(selectGroup.filter((i) => i !== id))
        } else {
            setSelectGroup([...selectGroup, id])
        }
    }

    const handleSelectAddedGroup = (id) => {
        if (selectAddedGroup.includes(id)) {
            setSelectAddedGroup(selectAddedGroup.filter((i) => i !== id))
        } else {
            setSelectAddedGroup([...selectAddedGroup, id])
        }
    }

    const handleAddGroup = () => {
        const selectedGroup = LIST_GROUP.filter((item) => selectGroup.includes(item.id))
        setChosenGroup((prev) => {
            const newGroup = prev.concat(selectedGroup)
            return newGroup
        })

        setChooseGroup((prev) => {
            const newGroup = prev.filter((item) => !selectGroup.includes(item.id))
            return newGroup
        })

        setSelectGroup([])
    }

    const handleRemoveGroup = () => {
        const selectedGroup = chosenGroup.filter((item) => selectAddedGroup.includes(item.id))
        setChooseGroup((prev) => {
            const newGroup = prev.concat(selectedGroup)
            return newGroup
        })
        setChosenGroup((prev) => {
            const newGroup = prev.filter((item) => !selectAddedGroup.includes(item.id))
            return newGroup
        })
        setSelectAddedGroup([])
    }

    const handleSubmitUserPermission = () => {
        try {
            axiosHttpService.put(API_USER_PERMISSION + user.id, { permission: chosenPermission, group: chosenGroup })
            notifySuccess("Thêm quyền cho người dùng thành công")
            setTimeout(() => {
                reFetchUser()
            }, 300)
        } catch (error) {
            notifyError("Đã có lỗi xảy ra")
        }
    }

    const handleDeleteUser = () => {
        axiosHttpService.delete(API_USER_PERMISSION + user.id)

        setTimeout(() => {
            reFetchUser()
            notifySuccess("Xóa người dùng thành công")
        }, 300)
    }

    return (
        <div className="mb-[50px]">
            <div className="flex justify-between">
                <h2 className="font-medium text-[20px]">{ }</h2>
                <Button onClick={() => setStateUserChange(null)}>Đóng</Button>
            </div>


            <div>
                <div className="flex mt-[8px]">
                    <p className="w-[25%]">Nhóm: </p>
                    <div className="w-full flex">
                        <div className="w-[45%] mr-[4px] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những nhóm khả thi</h2>
                            <Search title="Lọc" enterButton allowClear className="h-[40px]" />
                            <ul className="h-[200px] overflow-auto">

                                {chooseGroup.map((item, index) => {
                                    const doesSelected = selectGroup.includes(item.id)
                                    return (
                                        <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} onClick={() => handleSelectGroup(item.id)} key={GetKey()}>
                                            {item.name}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center mx-[2px]">

                            <Button className="w-[2px] rounded-[50%]" onClick={handleRemoveGroup}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i className="fa-solid fa-left-long"></i>
                                </span>
                            </Button>

                            <Button className="w-[2px] rounded-[50%]" onClick={handleAddGroup}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i className="fa-solid fa-right-long"></i>
                                </span>
                            </Button>

                        </div>
                        <div className="w-[45%] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những nhóm đã chọn</h2>
                            <ul className="h-[200px] overflow-auto">
                                {chosenGroup.map((item, index) => {
                                    const doesSelected = selectAddedGroup.includes(item.id)
                                    return <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} key={GetKey()} onClick={() => handleSelectAddedGroup(item.id)}>{item.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex mt-[8px]">
                    <p className="w-[25%]">Quyền: </p>
                    <div className="w-full flex">
                        <div className="w-[45%] mr-[4px] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những quyền khả thi</h2>
                            <Search title="Lọc" enterButton allowClear className="h-[40px]" />
                            <ul className="h-[200px] overflow-auto">

                                {choosePermission.map((item, index) => {
                                    const doesSelected = selectPermission.includes(item.id)
                                    return (
                                        <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} onClick={() => handleSelectPermission(item.id)} key={GetKey()}>
                                            {item.name}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center mx-[2px]">

                            <Button className="w-[2px] rounded-[50%]" onClick={handleRemovePermission}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i className="fa-solid fa-left-long"></i>
                                </span>
                            </Button>

                            <Button className="w-[2px] rounded-[50%]" onClick={handleAddPermission}>
                                <span className="text-[10px] flex items-center justify-center">
                                    <i className="fa-solid fa-right-long"></i>
                                </span>
                            </Button>

                        </div>
                        <div className="w-[45%] flex flex-col border-solid border-[2px] rounded-[5px] p-[8px] border-black">
                            <h2 className="mb-[4px]">Những quyền đã chọn</h2>
                            <ul className="h-[200px] overflow-auto">
                                {chosenPermission.map((item, index) => {
                                    const doesSelected = selectAddedPermission.includes(item.id)
                                    return <li className={`cursor-pointer pl-[4px] ${doesSelected === true ? "bg-[#ccc]" : ""}`} key={GetKey()} onClick={() => handleSelectAddedPermission(item.id)}>{item.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex justify-end mt-[16px]">
                {
                    user === null ?
                        <Button className="mr-[12px]" danger onClick={handleDeleteUser}>Xóa</Button>
                        : ""
                }
                <Button onClick={handleSubmitUserPermission}>Lưu</Button>
            </div>
        </div>
    )
}

const User = ({ stateUser, setStateUser }) => {
    const [stateUserChange, setStateUserChange] = useState(null)
    const [dataSource, setDataSource] = useState([])
    const [listGroup, setListGroup] = useState([])

    const handleClickTable = (user) => {
        setStateUserChange({ state: "CHANGE_USER", user: user })
    }

    const handleClickAddUser = () => {
        setStateUserChange({ state: "CREATE_USER", user: null })
    }


    const reFetchUser = async () => {
        const res = await axiosHttpService.get(API_USER_PERMISSION)
        const data = res.data.map((item, index) => {
            return {
                id: item.id,
                username: <span className="cursor-pointer" onClick={() => handleClickTable(item)}>{item.username}</span>,
                email: <span className="cursor-pointer" onClick={() => handleClickTable(item)}>{item.email}</span>,
                firstname: item.first_name,
                lastname: item.last_name,
                staffstatus: item.staff_status
            }
        })

        setDataSource(data)
    }

    const fetchGroup = async () => {
        const res = await axiosHttpService.get(API_GROUP_PERMISSION)
        const data = res.data.map((item, index) => {
            return {
                id: item.id,
                name: item.name
            }
        })
        setListGroup(data)
    }
    useEffect(() => {
        fetchGroup()
        reFetchUser()
    }, [])

    return (
        stateUser &&
        <div className="w-full pl-[24px]">
            {stateUserChange === null ? <div>
                <div className="flex justify-between">
                    <h2 className="font-medium text-[20px]">Chọn người dùng để thay đổi</h2>
                    <Button onClick={() => handleClickAddUser()}>Thêm người dùng +</Button>
                </div>
                <div className="mt-[12px]">
                    <Search allowClear placeholder="Nhập tên người dùng" enterButton />
                </div>
                <Table fieldDatas={dataSource} fieldNames={columns} />

            </div>
                :
                <div>
                    {stateUserChange.state === "CREATE_USER" ? <CreateUser setStateUserChange={setStateUserChange} reFetchUser={reFetchUser} /> : <UserChange setStateUser={setStateUser} setStateUserChange={setStateUserChange} stateUserChange={stateUserChange} reFetchUser={reFetchUser} LIST_GROUP={listGroup} />
                    }
                </div>}

        </div>
    )
}

const Decentralization = () => {
    const [stateGroup, setStateGroup] = useState(false)
    const [stateUser, setStateUser] = useState(false)

    return (
        <div className="flex justify-between mx-[24px] h-full">
            <div className="w-[15%] border-r-4 h-full">
                <h2 className="text-[14px] font-bold">PHÂN QUYỀN</h2>
                <div>
                    <div className="flex items-center border-b-4 py-[8px] cursor-pointer" onClick={() => {
                        setStateGroup(true)
                        setStateUser(false)
                    }}>
                        <span className="text-[#00f] w-[30px]"><i className="fa-solid fa-user-group"></i></span>
                        <p className="text-[14px] font-medium">
                            Nhóm
                        </p>
                    </div>
                    <div className="flex items-center py-[8px] cursor-pointer" onClick={() => {
                        setStateUser(true)
                        setStateGroup(false)
                    }}>
                        <span className="text-[#00f] w-[30px]"><i className="fa-solid fa-user"></i></span>
                        <p className="text-[14px] font-medium">
                            Người dùng
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-[85%]">
                <Group stateGroup={stateGroup} setStateGroup={setStateGroup} />
                <User stateUser={stateUser} setStateUser={setStateUser} />
            </div>
        </div>
    )
}

export default Decentralization
