import { Button } from "antd"
import { Table } from "../../../custom/Components/Table"
import { useState } from "react"
import { cloneElement } from "react"
import { Link } from "react-router-dom"
const DanhMucCoQuan = ({ fieldNames,
    fieldDatas,
    isLoading,
    SearchBar,
    Create = null,
    id = null,
    title = null,
    breadcrumb = null
}) => {
    const [modalOpen, setModalOpen] = useState(false)

    if (Create !== null)
        Create = cloneElement(Create, { modalOpen: modalOpen, setModalOpen: setModalOpen, id: id })

    return (
        <div className="w-full">
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">Khai báo danh mục / {breadcrumb}
                    </span>
                </p>

            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <p className="text-[20px] font-bold ">{title}</p>
                {Create !== null ?
                    <Button onClick={() => setModalOpen(true)} className="text-white bg-[#00f]">Tạo mới</Button> : ""}
                {Create !== null ? Create : null}
            </div>
            {SearchBar}
            <Table fieldNames={fieldNames} fieldDatas={fieldDatas} isLoading={isLoading} isCheckBox={false} />
        </div>
    )
}

export default DanhMucCoQuan