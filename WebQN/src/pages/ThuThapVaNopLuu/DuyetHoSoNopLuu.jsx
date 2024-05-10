/* eslint-disable react-hooks/exhaustive-deps */
import BasePage from "src/pages/BasePage";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";

const DuyetHoSoNopLuu = () => {
    const parent = [
        { title: "Thu thập và nộp lưu",
        // link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap",
    },
    ]

    const current = {
        link: "/thu-thap-va-nop-luu/duyet-ho-so-nop-luu",
        title: "Duyệt hồ sơ nộp lưu"
    }

    const filter = (files) => {
        const newFiles = []
        for (const file of files) {
            if (file.state.props.children === "Nộp lưu cơ quan")
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
        eOffice={false}
        haveActionButton={false}
    />
}

export default DuyetHoSoNopLuu;
