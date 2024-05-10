import { Button } from "antd"
import { Table } from "../../../custom/Components/Table"
import { useState } from "react"
import { cloneElement } from "react"

const DanhMucKhoLuuTru = ({ fieldNames, fieldDatas, title, isLoading, SearchBar, Create }) => {
    const [modalOpen, setModalOpen] = useState(false)
    Create = cloneElement(Create, { modalOpen: modalOpen, setModalOpen: setModalOpen })

    const newFieldData = []

    for(const data of fieldDatas) {
        let temp = {}
        Object.keys(data).forEach(key => {
            if(key === 'organId' || key === 'warehouseId' || key === 'warehouseroomId' || key === 'shelfId')
                return 
            temp[key] = data[key]
        })
        newFieldData.push(temp)
    }

    return (
        <div className="w-full">
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Khai báo danh mục / Danh mục kho lưu trữ / </span>
                    <span>
                        {title}
                    </span>
                </p>

            </div>
            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <p className="text-[20px] font-bold ">{title}</p>
                <Button onClick={() => setModalOpen(true)} className="text-white bg-[#00f]">Tạo mới</Button>
                {Create}
            </div>
            {SearchBar}
            <Table fieldNames={fieldNames} fieldDatas={newFieldData} isLoading={isLoading} isCheckBox={false} />

        </div>
    )
}

export default DanhMucKhoLuuTru
