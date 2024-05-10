import { ENUM_STATE_FILE } from "src/storage/Storage";
import BasePage from "../BasePage";

const API_DOCUMENT_MODIFICATION_PLAN = import.meta.env.VITE_API_DOCUMENT_MODIFICATION_PLAN

const HoSoChinhLyBiTraVe = () => {
    const parent = [
        {
            title: "Biên mục chỉnh lý",
            // link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
        },
    ];

    const current = {
        link: "bien-muc-chinh-ly/ho-so-chinh-ly-bi-tra-ve",
        title: "Hồ sơ chỉnh lý bị trả về",
    };

    const filter = (files) => {
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === ENUM_STATE_FILE.HSCL_BI_TRA_VE)
                newFiles.push(file)
        }
        return newFiles
    }

    return (
        <BasePage
            parent={parent}
            current={current}
            filter={filter}
            apiPlan={API_DOCUMENT_MODIFICATION_PLAN}
            eOffice={false}
            haveActionButton={false}
            BMCL_GuiDuyetHoSo={true}
        />
    );
};

export default HoSoChinhLyBiTraVe;
