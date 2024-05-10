/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import { Checkbox } from "antd";
import { Spin } from "antd";
import { GetKey } from "src/utils/function";

const CheckBox = ({ id, type, name, handleClickCheckBox, isChecked }) => {
    return (
        <Checkbox
            id={id}
            name={name}
            type={type}
            onChange={handleClickCheckBox}
            checked={isChecked}
            className="outline-none"
        />
    );
};

const ConvertDataToArrayForRenderTableCell = (table) => {
    const dataTableRender = []
    for (let row of table) {
        const data = []
        for (const key in row) {
            if (key === "gov_file_id" || key === "id") data.push(row[key])
            if (!Array.isArray(row[key])) {
                if (key.includes("state")) {
                    let color = "bg-[#0984e3]"

                    if (row[key].props.children === "Đóng") {
                        color = "bg-red-600";
                    } else if (row[key].props.children === "Nộp lưu cơ quan") {
                        color = "bg-yellow-500";
                    } else if (row[key].props.children === "Lưu trữ cơ quan") {
                        color = "bg-green-500";
                    } else if (row[key].props.children === "Nộp lưu lịch sử") {
                        color = "bg-blue-600";
                    } else if (row[key].props.children === "Lưu trữ lịch sử") {
                        color = "bg-purple-900";
                    } else if (row[key].props.children === "Nộp lưu cơ quan bị trả về") {
                        color = "bg-pink-500";
                    } else if (row[key].props.children === "Nộp lưu lịch sử bị trả về") {
                        color = "bg-orange-500";
                    }


                    data.push(<td className="text-white px-[12px] py-[16px] break-words text-center" >
                        <span className={`block px-[2px] py-[4px] rounded-md text-[12px] font-300 break-normal ${color}`}>
                            {row[key]}
                        </span>
                    </td>)
                } else {
                    data.push(<td className="px-[12px] py-[16px] break-words text-center" >{row[key]}</td>)
                }
            } else {
                // This field is Button
                data.push(<td className="px-[12px] py-[16px] overflow-hidden" >
                    {row[key].map((ChildData, index) => {
                        return <ChildData key={GetKey()} />
                    })}
                </td>)
            }
        }
        dataTableRender.push(data)
    }
    return dataTableRender
}

export const Table = ({
    fieldNames,
    fieldDatas,
    isLoading = false,
    setStateCheckBox = null,
    isCheckBox = false,
    headerBgColor = "#fafafa",
    selectedFiles = null
}) => {

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const dataTableRenderForTableCell = ConvertDataToArrayForRenderTableCell(fieldDatas)

    let doesNeedOrder = true

    for (let i = 0; i < fieldNames.length; i++)
        if (fieldNames[i].key === "doc_ordinal") {
            doesNeedOrder = false
            break
        }

    const handleCheckBoxAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(fieldDatas.map((file) => ("checkbox" + file["id"])))
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClickCheckBox = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    useEffect(() => {
        if (setStateCheckBox === undefined || setStateCheckBox === null) return
        setStateCheckBox(isCheck)
    }, [isCheck, setStateCheckBox])

    useEffect(() =>{
        if(!selectedFiles) return 
        setIsCheck(selectedFiles)
    }, [])

    return (
        <Spin spinning={isLoading} delay={0}>
            <div className="p-[24px]">

                <div className="bg-[#f0f2f5] rounded-[2px] border-[2px] border-solid border-stone-400">
                    <table className="table-fixed w-full">
                        <colgroup></colgroup>
                        <thead className={`bg-[${headerBgColor}]`}>
                            <tr>
                                {
                                    doesNeedOrder &&
                                    <th className="text-[12px]  relative w-[40px] text-center px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]">TT</th>
                                }

                                {isCheckBox && <th className="text-[12px]  relative w-[50px] text-center px-[8px] py-[12px] before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]">
                                    Chọn
                                    <CheckBox
                                        type="checkbox"
                                        name="selectAll"
                                        id="selectAll"
                                        handleClickCheckBox={handleCheckBoxAll}
                                        isChecked={isCheckAll}
                                    />
                                </th>}

                                {fieldNames.map((field, index) => {
                                    let className = "text-[12px] relative text-center px-[8px] py-[12px]"
                                    if (index < fieldNames.length - 1) {
                                        className += " before:content-[''] before:w-[2px] before:absolute before:right-0 before:h-[20px] before:bg-[#e0e0e0] before:top-[50%] before:translate-y-[-50%]"
                                    }
                                    return (
                                        <th key={GetKey()} style={{ width: field.width }} className={className}>{field.title}</th>
                                    )
                                })}
                            </tr></thead>

                        <tbody>
                            {
                                !fieldDatas.length &&
                                <tr className="hover:bg-[#fafafa] bg-white border-t-[1px] border-solid border-[#e0e0e0]">
                                    <td colSpan={13}>
                                        <div className="w-full bg-white text-gray-400">
                                            <div className="text-center p-[16px]">
                                                <div><i className="text-[50px] fa-solid fa-box-open"></i></div>
                                                <p>Không có dữ liệu</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            }

                            {
                                dataTableRenderForTableCell.map((dataRow, index) => {
                                    return (
                                        <tr className="hover:bg-[#ecebeb] bg-white border-t-[1px] border-solid border-[#e0e0e0] text-[13px]" key={GetKey()}>

                                            {doesNeedOrder &&
                                                <td className="text-center px-[12px] py-[16px]"><span className="block w-[24px] h-[24px] rounded-[50%] bg-[#ccc]">{index + 1}</span></td>}

                                            {
                                                isCheckBox && <td className="px-[12px] py-[16px] overflow-hidden text-center" >
                                                    <CheckBox
                                                        key={GetKey()}
                                                        type="checkbox"
                                                        id={"checkbox" + dataRow[0]}
                                                        handleClickCheckBox={handleClickCheckBox}
                                                        isChecked={isCheck.includes("checkbox" + dataRow[0])}
                                                    />
                                                </td>
                                            }
                                            {   // dataRow[0] is id
                                                dataRow.splice(2).map((DataCell, index) => {
                                                    return DataCell
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </Spin>
    )
}

