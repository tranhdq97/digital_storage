import axiosHttpService from "src/utils/httpService";
import BasePage from "../BasePage";
import { useState, useEffect, useCallback } from "react";
import { ENUM_STATE_FILE } from "src/storage/Storage";

const API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL = import.meta.env.VITE_API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL
export const FIELDS_TABLE = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "150%" },
    { title: "Tiêu đề hồ sơ", key: "title", width: "100%" },
    { title: "Phông", key: "organ_id", width: "100%" },
    { title: "Vị trí lưu trữ", key: "drawer_name", width: "100%" },
    { title: "Thời hạn bảo quản", key: "maintenance", width: "100%" },
    { title: "Chế độ sử dụng", key: "rights", width: "100%" },
    { title: "Trạng thái", key: "state", width: "130%" },
    { title: "Chức năng", key: "Function", width: "120px" },
]


const KhoLuuTruLichSu = () => {
    const parent = [
        { title: "Lưu trữ lịch sử",

     },
    ]

    const current = {
        link: "/luu-tru-lich-su/kho-luu-tru-lich-su",
        title: "Kho lưu trữ lịch sử"
    }

    // const fetchAllOrganStorageFiles = async () => {
    //     const res = await axiosHttpService.get(API_STORAGE_GET_FILE_ORGAN_STORAGE_ALL)
    //     setAllOrganStorageFiles(res.data)
    // }

    // useEffect(() => {
    //     fetchAllOrganStorageFiles()
    // }, [])

    // const mergeTwoFile = (file, fileS) => {
    //     const newFile = {
    //         'id': file.id,
    //         'gov_file_code': file.gov_file_code,
    //         'title': file.title,
    //         'organ_id': file.organ_id,
    //         'warehouse': fileS.warehouse,
    //         'warehouseroom': fileS.warehouseroom,
    //         'shelf': fileS.shelf,
    //         'drawers': fileS.drawers,
    //         'maintenance': file.maintenance,
    //         'rights': file.rights,
    //         'state': file.state,
    //         'Function': file.Function
    //     }

    //     return newFile
    // }


    // const filter = useCallback((files) => {
        const filter = (files) => {
            const newFiles = []
            console.log(files)
            for (const file of files) {
                if (file.state.props.children === ENUM_STATE_FILE.LUU_TRU_LICH_SU)
                    newFiles.push(file)
            }
            return newFiles
        }
    // }, [allOrganStorageFiles]);


    return <BasePage parent={parent} current={current} haveActionButton={false} filter={filter} />
}

export default KhoLuuTruLichSu;
