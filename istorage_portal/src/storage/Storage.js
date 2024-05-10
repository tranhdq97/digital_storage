export const STATE = [
	"Tất cả",
	"Mở",
	"Đóng",
	"Nộp lưu cơ quan",
	"Lưu trữ cơ quan",
	"Nộp lưu lịch sử",
	"Lưu trữ lịch sử",
	"Nộp lưu cơ quan bị trả về",
	"Nộp lưu lịch sử bị trả về",
];

export const TABS_SIDEBAR = [
	{
		isExpand: false,
		icon: `<i class="fa-solid fa-house"></i>`,
		title: "Trang chủ",
		to: "/",
		numChildTabs: 0,
		key: "/",
		display: true,
	},

	{
		isExpand: false,
		icon: `<i class="fa-solid fa-house"></i>`,
		title: "Tìm kiếm hồ sơ",
		to: "/tim-kiem-ho-so",
		numChildTabs: 0,
		key: "/tim-kiem-ho-so",
		display: true,
	},
	{
		isExpand: false,
		icon: `<i class="fa-solid fa-house"></i>`,
		title: "Tìm kiếm toàn văn",
		to: "/tim-kiem-toan-van",
		numChildTabs: 0,
		key: "/tim-kiem-toan-van",
		display: true,
	},
];

export const LIST_PERMISSION = [
	{ id: 1, name: "admin | log entry | Can add log entry" },
	{ id: 2, name: "admin | log entry | Can change log entry" },
	{ id: 3, name: "admin | log entry | Can view log entry" },
	{ id: 4, name: "admin | log entry | Can add log entry" },
	{ id: 5, name: "admin | log entry | Can change log entry" },
	{ id: 6, name: "admin | log entry | Can view log entry" },
];

export const LANGUAGE = [
	{ title: "Tên ngôn ngữ", key: "name", width: "100%" },
	{ title: "Mã ngôn ngữ", key: "code", width: "100%" },
	{ title: "", key: "update", width: "100px" }
]

export const LANGUAGE_INPUT = [
	{ type: "text", require: true, name: "name", label: "Tên ngôn ngữ" },
	{ type: "text", require: true, name: "code", label: "Mã ngôn ngữ" },
]


export const PHYSICAL_STATE = [
	{ title: "Mã tình trạng vật lý", key: "code", width: "100%" },
	{ title: "Tên tình trạng vật lý", key: "name", width: "100%" },
	{ title: "", key: "update", width: "100px" }
]

export const PHYSICAL_STATE_INPUT = [
	{ type: "text", require: true, name: "code", label: "Mã tình trạng vật lý" },
	{ type: "text", require: true, name: "name", label: "Tên tình trạng vật lý" },
]

export const STORAGE_DURATION = [
	{ title: "Mã thời hạn bảo quản", key: "code", width: "100%" },
	{ title: "Thời hạn", key: "duration", width: "100%" },
	{ title: "Số năm", key: "number_of_year", width: "100%" },
	{ title: "", key: "update", width: "100px" }
]

export const STORAGE_DURATION_INPUT = [
	{ type: "text", require: true, name: "code", label: "Mã thời hạn bảo quản" },
	{ type: "number", require: true, name: "duration", label: "Thời hạn" },
	{ type: "number", require: true, name: "number_of_year", label: "Số năm" },
]

export const FOND = [
	{ title: "Mã cơ quan lưu trữ", key: "identifier", width: "100%" },
	{ title: "Mã phông/công trình/sưu tập lưu trữ", key: "organ_id", width: "100%" },
	{ title: "Tên phông/công trình/sưu tập lưu trữ", key: "fond_name", width: "100%" },
	{ title: "", key: "update", width: "100px" },
];


export const FOND_INPUT = [
	{ type: "text", require: true, name: "identifier", label: "Mã cơ quan lưu trữ" },
	{ type: "text", require: true, name: "organ_id", label: "Mã phông/công trình/sưu tập lưu trữ" },
	{ type: "text", require: true, name: "fond_name", label: "Tên phông/công trình/sưu tập lưu trữ" },
	{ type: "text", require: true, name: "fond_history", label: "Lịch sử đơn vị hình thành phông" },
	{ type: "text", require: true, name: "archives_time", label: "Thời gian tài liệu" },
	{ type: "number", require: true, name: "paper_total", label: "Tổng số tài liệu giấy" },
	{ type: "number", require: true, name: "paper_digital", label: "Số lượng tài liệu giấy đã số hóa" },
	{ type: "text", require: true, name: "key_groups", label: "Các nhóm tài liệu chủ yếu" },
	{ type: "text", require: true, name: "other_types", label: "Các loại hình tài liệu khác" },
	{ type: "text", require: true, name: "language", label: "Ngôn ngữ" },
	{ type: "text", require: true, name: "lookup_tools", label: "Công cụ tra cứu" },
	{ type: "number", require: true, name: "copy_number", label: "Số lượng trang tài liệu đã lập bản sao bảo hiểm" },
	{ type: "text", require: true, name: "description", label: "Ghi chú" },
];
