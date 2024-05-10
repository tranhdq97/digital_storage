export const KE_HOACH_CHINH_LY_FIELD_TABLE = [
	{ title: "Tên kế hoạch", key: "name", width: "150%" },
	{ title: "Năm bắt đầu", key: "start_date", width: "50%" },
	{ title: "Năm kết thúc", key: "end_date", width: "50%" },
	{ title: "Cơ quan / Đơn vị lập kế hoạch", key: "organ", width: "100%" },
	{ title: "Chức năng", key: "function", width: "120px" },
];

export const KE_HOACH_CHINH_LY_INPUT= [
	{ type:"text", require:true, label: "Tên kế hoạch", name: "name"},
	{ type:"date", require:true, label: "Năm bắt đầu", name: "start_date"},
	{ type:"date", require:true, label: "Năm kết thúc", name: "end_date"},
	{ type:"text", require:true, label: "Cơ quan / Đơn vị lập kế hoạch", name: "organ", disabled: true},
];

