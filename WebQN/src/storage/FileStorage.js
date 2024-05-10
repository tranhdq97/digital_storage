export const FIELDS_TABLE = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "150%" },
    { title: "Tiêu đề hồ sơ", key: "title", width: "100%" },
    { title: "Phông", key: "organ_id_name", width: "100%" },
    { title: "Số lượng tờ", key: "sheet_number", width: "70px" },
    { title: "Số lượng văn bản", key: "TotalDoc", width: "70px" },
    { title: "Thời gian bắt đầu", key: "start_date", width: "100%" },
    { title: "Thời gian kết thúc", key: "end_date", width: "100%" },
    { title: "Thời hạn bảo quản", key: "maintenance_name", width: "100%" },
    { title: "Chế độ sử dụng", key: "rights", width: "100%" },
    { title: "Trạng thái", key: "state", width: "130%" },
    { title: "Chức năng", key: "Function", width: "120px" },
]

export const FIELDS_TABLE_STORE_ORGAN = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "150%" },
    { title: "Tiêu đề hồ sơ", key: "title", width: "100%" },
    { title: "Phông", key: "organ_id", width: "100%" },
    { title: "Vị trí lưu trữ", key: "drawer_name", width: "100%" },
    { title: "Thời hạn bảo quản", key: "maintenance_name", width: "100%" },
    { title: "Chế độ sử dụng", key: "rights", width: "100%" },
    { title: "Trạng thái", key: "state", width: "130%" },
    { title: "Chức năng", key: "Function", width: "120px" },
]

export const IDENTIFIER_CODE = {
    "Trung tâm Lưu trữ lịch sử": "001.03.34.H48",
    "Sở Giáo dục và Đào tạo": "001.03.34.J09",
    "Sở Thông tin và Truyền thông": "001.09.34.K21",
    "UBND tỉnh Quảng Ngãi": "020.03.34.H01",
}

export const IDENTIFIER = [
    { label: "Trung tâm Lưu trữ lịch sử" , value: "Trung tâm Lưu trữ lịch sử"},
    { label: "Sở Giáo dục và Đào tạo", value: "Sở Giáo dục và Đào tạo" },
    { label: "Sở Thông tin và Truyền thông", value: "Sở Thông tin và Truyền thông" },
    { label: "UBND tỉnh Quảng Ngãi", value: "UBND tỉnh Quảng Ngãi" },
]

export const ORGAN_ID = [
    { label: "Phông trung tâm Lưu trữ lịch sử" , value: "Phông trung tâm Lưu trữ lịch sử"},
    { label: "Phông sở Thông tin và Truyền thông", value: "Phông sở Thông tin và Truyền thông" },
    { label: "Phông sở Giáo dục và Đào tạo", value: "Phông sở Giáo dục và Đào tạo" },
]

export const MAINTENANCE = [
    { label: "5 năm", value: "5 năm" },
    { label: "10 năm", value: "10 năm" },
    { label: "20 năm", value: "20 năm" },
    { label: "30 năm", value: "30 năm" },
    { label: "40 năm", value: "40 năm" },
    { label: "50 năm", value: "50 năm" },
    { label: "Vĩnh viễn", value: "Vĩnh viễn" },
]

export const LANGUAGE = [
    { label: "Tiếng Việt", value: "Tiếng Việt" },
    { label: "Tiếng Anh", value: "Tiếng Anh" },
    { label: "Tiếng Trung", value: "Tiếng Trung" },
    { label: "Tiếng Pháp", value: "Tiếng Pháp" },
    { label: "Tiếng Nga", value: "Tiếng Nga" },
    { label: "Tiếng Nhật", value: "Tiếng Nhật" },
]

export const FORMAT = [
    { label: "Bình thường", value: "Bình thường" },
    { label: "Khó đọc", value: "Khó đọc" },
    { label: "Nhiều tài liệu thủng", value: "Nhiều tài liệu thủng" },
]

export const RIGHTS = [
    { value: "Công Khai", label: "Công Khai" },
    { value: "Không công khai", label: "Không công khai" },
    { value: "Riêng tư", label: "Riêng tư" },
]
