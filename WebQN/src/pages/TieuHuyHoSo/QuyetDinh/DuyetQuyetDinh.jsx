/* eslint-disable react-hooks/exhaustive-deps */

import BasePage from "src/pages/BasePage";
import { ENUM_STATE_FILE, ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";

const filterPlan = (plan) => {
    return (plan.type === ENUM_TYPE_PLAN.QUYET_DINH_TIEU_HUY && plan.state === ENUM_STATE_PLAN.CHO_DUYET)
}


const DuyetQuyetDinh = () => {
    const parent = [
        {
            title: "Tiêu huỷ hồ sơ",
            //  link: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop"
        },
    ]

    const current = {
        link: "/tieu-huy-ho-so/quyet-dinh/duyet-quyet-dinh",
        title: "Phê duyệt quyết định tiêu huỷ hồ sơ"
    }

    const filter = (files) => {
        const newFiles = []

        let today = new Date()
        const y = today.getFullYear();
        const m = today.getMonth() + 1; // Months start at 0!
        const d = today.getDate();

        today = new Date(`${y}-${m}-${d}`)

        for (const file of files) {
            console.log(file.state.props.children)
            if (file.state.props.children !== ENUM_STATE_FILE.THHS_CHO_PHE_DUYET_TIEU_HUY) continue;
            // if (file.maintenance_name !== "Vĩnh viễn") continue;
            // if (file.end_date === null || file.end_date === undefined || (file.state.props.children !== 'Nộp lưu lịch sử' || file.maintenance !== "Vĩnh viễn"))
            //     continue
            // if (dateDiff(file.end_date) >= 10)
            newFiles.push(file)
        }

        return newFiles
    }


    return <BasePage
        filtePlanCondition={filterPlan}
        parent={parent}
        current={current}
        filter={filter}
        isCheckBox={false}
        pheDuyetTieuHuy={true}
        haveActionButton={false} />
}

export default DuyetQuyetDinh;
