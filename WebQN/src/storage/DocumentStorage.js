import { LANGUAGE, FORMAT, RIGHTS, ORGAN_ID, IDENTIFIER } from "./FileStorage"

export const FORM_FIELDS = [
    { key: "doc_ordinal", title: "Số thứ tự", require: true, type: "number" },
    { key: "autograph", title: "Bút tích", require: false, type: "text" },
    { key: "issued_date", title: "Ngày, tháng, năm văn bản", require: true, type: "date" },
    { key: "code_number", title: "Số của văn bản", require: false, type: "text" },
    { key: "doc_code", title: "Mã định danh văn bản", require: false, type: "text" },
    { key: "identifier", title: "Mã cơ quan lưu trữ", require: true, type: "select", options: IDENTIFIER, disabale:true }, // organ


    { key: "mode", title: "Chế độ sử dụng", require: true, type: "select", options: RIGHTS },
    { key: "language", title: "Ngôn ngữ", require: true, type: "select", options: LANGUAGE },
    // { key: "confidence_level", title: "Mức độ tin cậy", require: true, type: "select", options: },
    { key: "format", title: "Tình trạng vật lý", require: true, type: "select", options: FORMAT },
    { key: "organ_id", title: "Mã phông/công trình/sưu tập lưu trữ", require: true, type: "select", options: ORGAN_ID, extract: true },



    { key: "file_catalog", title: "Mục lục số hoặc năm hình thành hồ sơ", require: false, type: "number", extract: true },
    { key: "file_notation", title: "Số và ký hiệu hồ sơ", require: false, type: "text", extract: true },
    { key: "type_name", title: "Tên loại văn bản", require: false, type: "text" },
    { key: "code_notation", title: "Ký hiệu của văn bản", require: false, type: "text" },
    { key: "organ_name", title: "Tên cơ quan, tổ chức ban hành văn bản", require: false, type: "text" },
    { key: "subject", title: "Trích yếu nội dung", require: false, type: "text" },
    { key: "page_amount", title: "Số lượng trang của văn bản", require: false, type: "number" },
    { key: "description", title: "Ghi chú", require: false, type: "text" },
    { key: "infor_sign", title: "Ký hiệu thông tin", require: false, type: "text" },
    { key: "keyword", title: "Từ khóa", require: false, type: "text" },
]
