import { ENUM_STATE_FILE } from "src/storage/Storage";
import BasePage from "../BasePage";
import { ENUM_STATE_PLAN, ENUM_TYPE_PLAN } from "src/storage/Storage";
const API_GET_PLAN_BY_TYPE = import.meta.env.VITE_API_GET_PLAN_BY_TYPE;


const filtePlanCondition = (file) => {
    const state = (file.type === ENUM_TYPE_PLAN.BIEN_MUC_CHINH_LY && file.state === ENUM_STATE_PLAN.CHAP_NHAN);
    return state;
}

const BienMucHoSo = () => {
    const parent = [
        {
            title: "Biên mục chỉnh lý",
            // link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
        },
    ];

    const current = {
        link: "/bien-muc-chinh-ly/bien-muc-ho-so",
        title: "Biên mục hồ sơ",
    };

    const filter = (files) => {
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === ENUM_STATE_FILE.HSCL_TAO_MOI)
                newFiles.push(file)
        }
        return newFiles
    }

    return (
        <BasePage
            parent={parent}
            current={current}
            addNewFile={true}
            filter={filter}
            apiPlan={API_GET_PLAN_BY_TYPE + '/' + ENUM_TYPE_PLAN.BIEN_MUC_CHINH_LY}
            eOffice={false}
            haveActionButton={false}
            BMCL_GuiDuyetHoSo={true}
            filtePlanCondition={filtePlanCondition}
        />
    );
};

export default BienMucHoSo;
