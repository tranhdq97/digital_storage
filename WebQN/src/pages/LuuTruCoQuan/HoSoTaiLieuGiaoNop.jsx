/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "../BasePage";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";
import { ENUM_STATE_FILE } from "src/storage/Storage";

const parent = [
    { title: "Lưu trữ cơ quan",
    // link: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop"
},
]

const current = {
    link: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop",
    title: "Hồ sơ tài liệu giao nộp (chờ xếp kho)"
}

const HoSoTaiLieuGiaoNop = () => {
    const filter = (files) => {
        const newFiles = []
        console.log(files)
        for (const file of files) {
            if (file.state.props.children === ENUM_STATE_FILE.CHO_XEP_KHO)
                newFiles.push(file)
        }
        return newFiles
    }


    return <BasePage
        parent={parent}
        current={current}
        filter={filter}
        isCheckBox={false}
        buttonFuctions={<ButtonFuctions />}
        currentStateModal={ENUM_STATE_FILE.LUU_TRU_CO_QUAN}
        eOffice={false} />
}

export default HoSoTaiLieuGiaoNop;
