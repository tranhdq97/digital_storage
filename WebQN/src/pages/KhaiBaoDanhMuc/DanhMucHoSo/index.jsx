/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Select, Spin } from "antd"
import { useEffect, useState } from "react"
import { Input, Table, Modal, Popconfirm } from "antd"
import axiosHttpService from "src/utils/httpService";
import UserAPIService from 'src/service/api/userAPIService';
const CATEGORY_FILE_API = import.meta.env.VITE_CATEGORY_FILE_API

// API: 
//     #id
//     #name
//     #description
//     #parent
//     #order

const Search = Input.Search;

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

const Create = ({
    modalOpen,
    setModelOpen,
    reFetchData,
    order, // 1: first, 2: second, 3: third
    parent, // for 2 and 3
    select // for 2 and 3, 1 is "Danh mục gốc"
}) => {

    const [request, setRequest] = useState({})
    const [selectOrder, setSelectOrder] = useState([])
    const [defaultValue, setDefaultValue] = useState("Danh mục gốc")


    useEffect(() => {
        let selectFiltered = null
        const newSelect = []

        if (order === 1) {
            setDefaultValue("Danh mục gốc")
            setSelectOrder([])
            return
        }

        if (order === 2)
            selectFiltered = select.filter(item => item.order === 1)
        if (order === 3)
            selectFiltered = select.filter(item => item.order === 2)

        selectFiltered.forEach(item => {
            const newItem = {
                label: item.name,
                value: item.id
            }
            newSelect.push(newItem)
        })

        setDefaultValue(newSelect.filter(item => item.value === parent)[0].label)
        setSelectOrder(prev => newSelect)
    }, [order])

    const handleOk = async () => {

        const _organ = await UserAPIService.getUserOrgan();
        request["order"] = order
        request["parent"] = parent
        request["organ"] = _organ.id
        await axiosHttpService.post(`${CATEGORY_FILE_API}`, request)

        setTimeout(() => {
            reFetchData()
            setRequest({})
            setModelOpen(false)
        }, 500)

    }


    const handleCancle = () => {
        setModelOpen(false)
    }

    const handleChangeRequest = (name, value) => {
        setRequest({
            ...request,
            [name]: value
        })
    }

    return (
        <Modal
            title="Tạo mới"
            style={{
                top: 20,
            }}
            open={modalOpen}
            onOk={handleOk}
            onCancel={handleCancle}
        >
            <div>
                <div className="flex justify-between py-[12px]">
                    <span>Tên</span>
                    <Input name="name" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" value={request["name"]} />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Đề mục / Nhóm lớn</span>
                    <Select
                        options={selectOrder}
                        value={defaultValue}
                        name="parent"
                        onChange={(e) => handleChangeRequest(e.target.name, e.target.value)}
                        type="text"
                        className="w-[70%]"
                    // value={order === 1 ? "Danh mục gốc" : request["parent"]}
                    />
                </div>

                <div className="flex justify-between py-[12px]">
                    <span>Mô tả</span>
                    <Input name="description" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" value={request["description"]} />
                </div>
            </div>
        </Modal>
    )
}

const Update = ({ reFetchData, id }) => {
    const [request, setRequest] = useState({
        name: null,
        description: null,
        parent: null,
    })
    

	const [categoryFile, setCategoryFile] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const getCategoryFile = async () => {
			
			const { data } = await axiosHttpService.get(CATEGORY_FILE_API);
			const _ = [];
			for (let i = 0; i < data.length; i++) {
				_.push({
					label: data[i].name,
					value: data[i].id,
				});
			}
			setCategoryFile(_);
		};
       
        const fetchData = async () => {
          try {
            const res = await axiosHttpService.get(`${CATEGORY_FILE_API}/${id}`);
            setRequest(res.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
		getCategoryFile();
        fetchData();
      }, [id]);

    const handleChangeRequest = (name, value) => {
        setRequest((prevRequest) => ({
            ...prevRequest,
            [name]: value,
          }));
    }

    const handleClick = () => {
        setModalOpen(true)
    }

    const handleOk = async () => {
        if (request.name !== null)
        {
            await axiosHttpService.put(CATEGORY_FILE_API + '/' + id, request)
            await reFetchData()
        }
        setModalOpen(false)
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
                title="Sửa"
                onOk={handleOk}
                onCancel={handleCancle}>
                <div className='flex justify-between items-center' >
                    <span>Tên</span>
                    <Input name="name" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} className='w-[70%]' value={request.name} />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Đề mục / Nhóm lớn</span>
                    <Select
                        options={categoryFile}
                        defaultValue={request.parent}
                        name="parent"
                        onChange={(e) => handleChangeRequest("parent", e)}
                        className="w-[70%]"
                    />
                </div>
                <div className="flex justify-between py-[12px]">
                    <span>Mô tả</span>
                    <Input name="description" onChange={(e) => handleChangeRequest(e.target.name, e.target.value)} type="text" className="w-[70%]" value={request["description"]} />
                </div>
                
            </Modal>
        </div>
    )
}

const Delete = ({
    id,
    reFetchData
}) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        const deleteWarehouse = async () => {
            const res = await axiosHttpService.delete(CATEGORY_FILE_API + '/' + id)
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
        <Popconfirm title="Xóa"
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

const generateColumn = (
    reFetchData,
    setModelOpen,
    setOrder,
    setParent,
    order = null) => {
    return [
        { title: "Tên đề mục và tiêu đề hồ sơ", dataIndex: "name", key: "name" },
        {
            title: "Hành động",
            dataIndex: "",
            width: "120px",
            render: (record) => {
                return (
                    <div className="flex items-center justify-left">
                        <div >
                            <Delete id={record.id} reFetchData={reFetchData} />
                        </div>
                        <div >
                            <Update id={record.id} reFetchData={reFetchData} />
                        </div>
                        {order !== null &&
                            <div
                                className="cursor-pointer ml-[10px]"
                                onClick={() => {
                                    setModelOpen(true)
                                    setOrder(order)
                                    setParent(record.id)
                                }}>
                                <i class="fa-solid fa-plus"></i>
                            </div>
                        }
                    </div>)
            }
        }
    ];
}

const DanhMucHoSo = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [order, setOrder] = useState(1)
    const [parent, setParent] = useState(null)
    const [modalOpen, setModelOpen] = useState(false)
    const [data, setData] = useState([])

    const reFetchData = async () => {
        setIsLoading(true)
        const res = await axiosHttpService.get(`${CATEGORY_FILE_API}`)
        setData(res.data)
        setIsLoading(false)
    }

    const columnsFirst = generateColumn(reFetchData, setModelOpen, setOrder, setParent, 2)
    const columnsSecond = generateColumn(reFetchData, setModelOpen, setOrder, setParent, 3)
    const columnsThird = generateColumn(reFetchData, setModelOpen, setOrder, setParent)

    useEffect(() => {
        reFetchData()
    }, [])

    const expandedRow1 = row => {
        const inTable = []
        data.forEach((item) => {
            if (item.parent === row.id) {
                inTable.push(item)
            }
        })
        return <Table
            columns={columnsThird}
            dataSource={inTable}
            pagination={false}
            className="pl-[50px]"
            showHeader={false} />;
    };

    const expandedRow = row => {
        const inTable = []
        data.forEach((item) => {
            if (item.parent === row.id) {
                inTable.push(item)
            }
        })

        return <Table columns={columnsSecond}
            expandable={{
                expandedRowRender: expandedRow1,
                rowExpandable: (record) => data.find(rc => rc.parent === record.id),
            }}
            dataSource={inTable}
            pagination={false}
            className="pl-[24px]"
            showHeader={false} />;
    };

    return (
        <div className="w-full">
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Khai báo danh mục / Danh mục hồ sơ </span>
                </p>

            </div>
            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <p className="text-[20px] font-bold">Danh mục hồ sơ</p>

                <Button className="text-white bg-[#00f]" onClick={() => {
                    setOrder(1)
                    setModelOpen(true)
                }}>Tạo mới</Button>

                <Create
                    modalOpen={modalOpen}
                    setModelOpen={setModelOpen}
                    reFetchData={reFetchData}
                    order={order}
                    select={data}
                    parent={parent}
                />

            </div>

            {<SearchBar />}

            <div className="mt-[30px] px-[24px]">
                <Spin spinning={isLoading}>
                    <Table columns={columnsFirst}
                        expandable={{
                            expandedRowRender: expandedRow,
                            rowExpandable: (record) => data.find(rc => rc.parent === record.id)
                        }}
                        dataSource={data.filter((item) => item.order === 1)} />
                </Spin>

            </div>
        </div>
    )
}

export default DanhMucHoSo
