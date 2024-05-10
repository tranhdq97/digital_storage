import BasePage from "../BasePage";
import { ENUM_STATE_FILE, ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";

const filterPlan = (file) => {
    return (file.type === ENUM_TYPE_PLAN.NOP_LUU_LICH_SU && file.state === ENUM_STATE_PLAN.DOI_SO_NOI_VU_DUYET)
}


const SoNoiVuPheDuyet = () => {
    const parent = [
        {
            title: "Lưu trữ lịch sử",
            //  link: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop" 
        },
    ]

    const current = {
        link: "/luu-tru-lich-su/so-noi-vu-phe-duyet",
        title: "Sở Nội vụ phê duyệt"
    }

    const filter = (files) => {
        const newFiles = []

        let today = new Date()
        const y = today.getFullYear();
        const m = today.getMonth() + 1; // Months start at 0!
        const d = today.getDate();

        today = new Date(`${y}-${m}-${d}`)

        for (const file of files) {
            if (file.state.props.children !== ENUM_STATE_FILE.NOP_LUU_LICH_SU_CHO_SO_NOI_VU_DUYET) continue;
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
        soNoiVuDuyet={true}
        haveActionButton={false}
        havePlan={true}
    />
}

export default SoNoiVuPheDuyet;
