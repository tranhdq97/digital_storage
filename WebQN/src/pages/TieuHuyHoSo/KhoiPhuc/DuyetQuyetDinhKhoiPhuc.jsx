/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/BasePage";
import { ENUM_STATE_FILE } from "src/storage/Storage";


const parent =
[{
    title: "Tiêu hủy hồ sơ",
    //link: "/tieu-huy-ho-so/khoi-phuc/danh-sach-ho-so-duoc-khoi-phuc" 
}]

const current = {
    link: "/tieu-huy-ho-so/khoi-phuc/danh-sach-ho-so-duoc-khoi-phuc",
    title: "Danh sách hồ sơ được khôi phục"
}


const DuyetQuyetDinhKhoiPhuc = () => {
    const filter = (files) => {
        const newFiles = [];
        for(const file of files){
            if(file.state.props.children !== ENUM_STATE_FILE.THHS_KHOI_PHUC) continue;
            newFiles.push(file);
        }
        return newFiles;
    }

    return (
        <BasePage
            parent={parent}
            current={current}
            filter={filter}
            duyetKhoiPhuc={true}
            haveActionButton={false}
        />
    )
}

export default DuyetQuyetDinhKhoiPhuc;
