/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/BasePage";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";
import { ENUM_STATE_FILE } from "src/storage/Storage";

const Duyetchinhly = () => {
    const parent = [
        { title: "Biên mục chỉnh lý", link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly" },
    ]

    const current = {
        link: "/duyet-chinh-ly",
        title: "Duyệt chỉnh lý"
    }

    const filter = (files) => {
        const newFiles = []
        console.log(files)
        for (const file of files) {
            if (file.state.props.children === ENUM_STATE_FILE.LUU_TRU_CO_QUAN)
                newFiles.push(file)
        }
        return newFiles
    }


    return <BasePage parent={parent}
        current={current}
        filter={filter}
        isCheckBox={false}
        buttonFuctions={<ButtonFuctions />}
        currentStateModal={ENUM_STATE_FILE.LUU_TRU_CO_QUAN}
        eOffice={false} />
}

export default Duyetchinhly;
