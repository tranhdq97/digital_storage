import { useEffect } from "react";
import axiosHttpService from "src/utils/httpService";
import BasePage from "src/pages/BasePage";
import { useState, useCallback } from "react";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";
const API_DOCUMENT_MODIFICATION_REJECT = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_REJECT
const API_DOCUMENT_MODIFICATION_REJECT_ADDED = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_REJECT_ADDED
import { ENUM_STATE_BMCL, ENUM_STATE_FILE } from "src/storage/Storage";

const BoSungHoSoTaiLieu = () => {
    const [fileIds, setFileIds] = useState(null)
    const [fileIdsAdded, setFileIdsAdded] = useState(null)
    const parent = [
        {
            title: "Biên mục chỉnh lý",
            // link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
        },
        {
            title: "Biên mục bổ sung",
            link: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu",
        },
    ];

    const current = {
        link: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu",
        title: "Bổ sung hồ sơ tài liệu",
    };
    useEffect(() => {
        const getDocumentReject = async () => {
            const response = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT)
            const data = response.data
            setFileIds(data)
        }
        const getDocumentRejectAdded = async () => {
            const response = await axiosHttpService.get(API_DOCUMENT_MODIFICATION_REJECT_ADDED)
            const data = response.data
            setFileIdsAdded(data)
        }
        getDocumentReject()
        getDocumentRejectAdded()
    }, [])

    const filter = useCallback((files) => {
        if (fileIds === null || fileIdsAdded === null) return files
        if (!fileIds.length) return []

        const existFiles = {}
        const newFiles = []
        for (const file of files) {
            const id = file.id
            const existInAdded = fileIdsAdded.find((item) => item.idFile === id)
            const existInReject = fileIds.find((item) => item.idFile === id)
            if(existInReject !== undefined && existInAdded === undefined && !existFiles[id] && file.state.props.children === ENUM_STATE_FILE.NOP_LUU_CO_QUAN) {
                newFiles.push(file)
                existFiles[id] = true
            }
        }
        return newFiles
    }, [fileIds, fileIdsAdded]);

    return (
        <BasePage
            parent={parent}
            current={current}
            addNewFile={true}
            filter={filter}
            eOffice={false}
            buttonFuctions={<ButtonFuctions />}
            currentStateModal={ENUM_STATE_BMCL.BMCL_BO_SUNG_HO_SO_TAI_LIEU}

        />
    );
};

export default BoSungHoSoTaiLieu;
