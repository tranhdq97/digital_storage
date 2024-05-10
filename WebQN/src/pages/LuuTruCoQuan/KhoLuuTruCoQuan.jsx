import BasePage from "../BasePage";
import { ENUM_STATE_FILE } from "src/storage/Storage";
import { DateDiff } from "src/custom/Function";

export const FIELDS_TABLE = [
    { title: "Mã hồ sơ", key: "gov_file_code", width: "150%" },
    { title: "Tiêu đề hồ sơ", key: "title", width: "100%" },
    { title: "Phông", key: "organ_id", width: "100%" },
    { title: "Vị trí lưu trữ", key: "drawer_name", width: "100%" },
    { title: "Thời gian kết thúc", key: "endDate", width: "100%" },
    { title: "Thời hạn bảo quản", key: "maintenance", width: "100%" },
    { title: "Chế độ sử dụng", key: "rights", width: "100%" },
    { title: "Trạng thái", key: "state", width: "130%" },
    { title: "Chức năng", key: "Function", width: "120px" },
]


const KhoLuuTruCoQuan = () => {
    const parent = [
        {
            title: "Lưu trữ cơ quan",
        },
    ]

    const current = {
        link: "/luu-tru-co-quan/kho-luu-tru-co-quan",
        title: "Kho lưu trữ cơ quan"
    }

    const filter = (files) => {
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children !== ENUM_STATE_FILE.LUU_TRU_CO_QUAN) continue;
            if (file.maintenance_name === 'Vĩnh viễn') {
                newFiles.push(file);
                continue;
            }
            let today = new Date()
            const y = today.getFullYear();
            const m = today.getMonth() + 1; // Months start at 0!
            const d = today.getDate();
            today = new Date(`${y}-${m}-${d}`);

            const endDate = new Date(file.endDate);
            endDate.setFullYear(endDate.getFullYear() + Number(file.maintenance_name));

            if (DateDiff(endDate, today) < 0)
                newFiles.push(file)
        }
        return newFiles
    }


    return <BasePage parent={parent} haveActionButton={false} current={current} filter={filter} fieldsTableCustom={FIELDS_TABLE} luuTruCoQuan={true} />
}

export default KhoLuuTruCoQuan;
