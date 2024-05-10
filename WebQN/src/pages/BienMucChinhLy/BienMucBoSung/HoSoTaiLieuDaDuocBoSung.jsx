/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/BasePage";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";
import { ENUM_STATE_BMCL, ENUM_STATE_FILE } from "src/storage/Storage";
import { useCallback, useEffect, useState } from "react";
import axiosHttpService from "src/utils/httpService";
const API_DOCUMENT_MODIFICATION_REJECT_ADDED = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_REJECT_ADDED

const parent = [
    { title: "Biên mục chỉnh lý", 
     //link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly"
 },
    { title: "Biên mục biên mục bổ sung", 
     //link: "http://localhost:5173/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu" 
    },
]

const current = {
    link: "/bien-muc-chinh-ly/bien-muc-bo-sung/ho-so-tai-lieu-da-duoc-bo-sung",
    title: "Hồ sơ tài liệu đã được bổ sung"
}

const HoSoTaiLieuDaDuocBoSung = () => {
    const [fileIds, setFileIds] = useState(null)

    useEffect(() => {
        const getFiles = async () => {
            const response = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT_ADDED)
            const data = response.data
            setFileIds(data)
        }
        getFiles()
    }, [])


    const filter = useCallback((files) => {
        if (fileIds === null) return files
        if (!fileIds.length) return []
        const newFiles = []
        const existFiles = {}
        for (const file of files) {
            if (file.state.props.children === ENUM_STATE_FILE.NOP_LUU_CO_QUAN) {
                const id = file.id
                const existInAdded = fileIds.find((item) => item.idFile === id)
                if (existInAdded !== undefined && !existFiles[id]) {
                    newFiles.push(file)
                    existFiles[id] = true
                }
            }
        }
        return newFiles
    }, [fileIds]);


    return <BasePage
        parent={parent}
        current={current}
        filter={filter}
        isCheckBox={false}
        buttonFuctions={<ButtonFuctions />}
        currentStateModal={ENUM_STATE_BMCL.BMCL_DA_BO_SUNG_TAI_LIEU}
        eOffice={false} />
}

export default HoSoTaiLieuDaDuocBoSung;
