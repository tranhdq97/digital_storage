export const KE_HOACH_CHINH_LY_FIELD_TABLE = [
	{ title: "Mã kế hoạch", key: "code", width: "70%" },
	{ title: "Tên kế hoạch", key: "name", width: "150%" },
	{ title: "Năm bắt đầu", key: "date_start", width: "50%" },
	{ title: "Năm kết thúc", key: "date_end", width: "50%" },
	{ title: "Cơ quan / Đơn vị lập kế hoạch", key: "organ", width: "100%" },
	{ title: "Phông", key: "organId", width: "100%" },
	{ title: "Chức năng", key: "function", width: "120px" },
];

export const KE_HOACH_CHINH_LY_INPUT= [
	{ type:"text", require:true, label: "Mã kế hoạch", name: "code"},
	{ type:"text", require:true, label: "Tên kế hoạch", name: "name"},
	{ type:"number", require:true, label: "Năm bắt đầu", name: "date_start"},
	{ type:"number", require:true, label: "Năm kết thúc", name: "date_end"},
	{ type:"select", require:true, label: "Cơ quan / Đơn vị lập kế hoạch", name: "organ"},
	{ type:"select", require:true, label: "Phông", name: "organId"},
];

