import { ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";
import BasePage from "../BasePage";

const API_PLAN = import.meta.env.VITE_API_PLAN;

const filtePlanCondition = (file) => {
    const state = (file.type === ENUM_TYPE_PLAN.THU_THAP_NOP_LUU && file.state === ENUM_STATE_PLAN.CHAP_NHAN);
    return state;
}

const ThuThapHoSo = () => {
    const parent = [
        {
            title: "Thu thập và nộp lưu",
         //    link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap",
        },
    ];

    const current = {
        link: "/thu-thap-va-nop-luu/thu-thap-ho-so",
        title: "Thu thập hồ sơ",
    };

    const filter = (files) => {
        const newFiles = [];
        for (const file of files) {
            if (
                file.state.props.children !== "Đóng" &&
                file.state.props.children !== "Mở"
            )
                continue;
            newFiles.push(file);
        }

        return newFiles;
    };

    return (
        <BasePage
            parent={parent}
            current={current}
            addNewFile={true}
            filter={filter}
            eOffice={true}
            apiPlan={API_PLAN}
            filtePlanCondition={filtePlanCondition}
        />
    );
};

export default ThuThapHoSo;
