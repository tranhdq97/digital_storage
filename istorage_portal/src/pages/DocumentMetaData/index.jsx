import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import TableDetail from "src/components/TableDetail";
import DocumentAPIService from "src/service/api/DocumentAPIService";
import { FIELDS_TABLE_DOCUMENT_DETAIL } from "src/storage/DocumentStorage";
import { setHeaderUnfixed } from "src/service/actions/headerAction";
import { useDispatch } from "react-redux";
import { addDocToCart } from "src/service/actions/cartAction";
import { notifySuccess } from "src/utils/function";
const DocumentMetaData = () => {
    const params = useParams();
    const {idFile, id} = params;
    const [doc, setDoc] = useState([])
    const fieldData = []
    const dispatch = useDispatch();
    dispatch(setHeaderUnfixed());
    for(const i in FIELDS_TABLE_DOCUMENT_DETAIL) {
        const detail = FIELDS_TABLE_DOCUMENT_DETAIL[i]
        fieldData.push({title: detail.title, value: doc[detail.key]})
    }

    useEffect(() =>{
        const getDocById = async () => {
            const response = await DocumentAPIService.getDocumentById(idFile, id)
            setDoc(response)
        }
        getDocById();
    }, [idFile, id])

    const handleClickAddDocToCart = () => {
        dispatch(addDocToCart(idFile, id))
        notifySuccess("Thêm văn bản vào giỏ hàng thành công")
    }
    return (
        <TableDetail
            headText={"Thông tin văn bản"}
            data={fieldData}
            handleBorrow={handleClickAddDocToCart}
        />
    )
}

export default DocumentMetaData
