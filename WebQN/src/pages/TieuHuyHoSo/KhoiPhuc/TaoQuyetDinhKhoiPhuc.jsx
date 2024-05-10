/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/BasePage";
import { ENUM_STATE_FILE } from "src/storage/Storage";


const parent =
    [
        { title: "Tiêu hủy hồ sơ" },
        // link: "/tieu-huy-ho-so/khoi-phuc/danh-sach-ho-so-bi-tieu-huy"
    ]

const current = {
    link: "/tieu-huy-ho-so/khoi-phuc/danh-sach-ho-so-bi-tieu-huy",
    title: "Danh sách hồ sơ bị tiêu huỷ"
}


const KhoiPhucHoSo = () => {

    const filter = (files) => {
        console.log("files", files);
        const newFiles = [];
        for (const file of files) {
            if (file.state.props.children !== ENUM_STATE_FILE.THHS_DA_TIEU_HUY) continue;
            newFiles.push(file);
        }
        return newFiles;
    }

    return (
        <BasePage
            parent={parent}
            current={current}
            filter={filter}
            haveActionButton={false}
            excel={false}
            havePlan={false}
            khoiPhuc={true}
        />
    )
}

export default KhoiPhucHoSo;
