import { DateDiff } from "src/custom/Function";
import BasePage from "src/pages/BasePage";
import { ENUM_STATE_FILE } from "src/storage/Storage";



const DanhSachHoSoChoTieuHuy = () => {
    const parent = []

    const current = {
        link: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy",
        title: "Danh sách hồ sơ chờ tiêu huỷ"
    }

    const filter = (files) => {
        const newFiles = []

        for (const file of files) {
            if ((file.maintenance_name === "Vĩnh viễn" || file.state.props.children !== ENUM_STATE_FILE.LUU_TRU_CO_QUAN)
                && file.state.props.children !== ENUM_STATE_FILE.THHS_CHO_TIEU_HUY
            ) continue;

            let today = new Date()
            const y = today.getFullYear();
            const m = today.getMonth() + 1; // Months start at 0!
            const d = today.getDate();
            today = new Date(`${y}-${m}-${d}`);

            const endDate = new Date(file.end_date);
            endDate.setFullYear(endDate.getFullYear() + Number(file.maintenance_name));

            if (DateDiff(endDate, today) >= 0) {
                file.state.props.children = ENUM_STATE_FILE.THHS_CHO_TIEU_HUY;
                newFiles.push(file)
            }
        }

        return newFiles
    }


    return <BasePage isCheckBox={false} parent={parent} current={current} filter={filter} haveActionButton={false}/>
}

export default DanhSachHoSoChoTieuHuy;
