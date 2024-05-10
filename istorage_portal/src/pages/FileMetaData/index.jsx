import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import FileAPIService from "src/service/api/FileAPIService";
import TableDetail from "src/components/TableDetail";
import { FIELDS_TABLE_FILE_DETAIL } from "src/storage/FileStorage";
import { useDispatch } from "react-redux";
import { setHeaderUnfixed } from "src/service/actions/headerAction";
import { addFileToCart } from "src/service/actions/cartAction";
import { notifySuccess } from "src/utils/function";
const FileMetaData = () => {
    const dispatch = useDispatch();
    const params = useParams();
    dispatch(setHeaderUnfixed());

    const { id } = params;
    const [file, setFile] = useState({});
    const fieldData = []

    for(const i in FIELDS_TABLE_FILE_DETAIL) {
        const detail = FIELDS_TABLE_FILE_DETAIL[i]
        fieldData.push({title: detail.title, value: file[detail.key]})
    }

    useEffect(() => {
        const getFile = async () => {
            const res = await FileAPIService.getFileById(id);
            setFile(res[0]);
        }
        getFile();
    }, [id])

    const handleClickAddFileToCart = () => {
        dispatch(addFileToCart(file))
        notifySuccess("Thêm hồ sơ vào giỏ hàng thành công!")
    }

    return (
        <TableDetail
            headText={"Thông tin văn bản"}
            data={fieldData}
            handleBorrow={handleClickAddFileToCart}
        />

    )
}

export default FileMetaData
