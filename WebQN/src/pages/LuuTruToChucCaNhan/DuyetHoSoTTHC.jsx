
import BasePage from "../BasePage";

import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";

const DuyetHoSoTTHC = () => {
    const parent = [
        {
            title: "Lưu trữ tổ chức, cá nhân",
            // link: "/kho-luu-tru-to-chuc-ca-nhan/duyet-ho-so-thuc-hien-thu-tuc-hanh-chinh",
        },
    ];

    const current = {
        link: "/kho-luu-tru-to-chuc-ca-nhan/duyet-ho-so-thuc-hien-thu-tuc-hanh-chinh",
        title: "Duyệt hồ sơ thực hiện thủ tục hành chính",
    };

    const filter = (files) => {
        const newFiles = [];
        for (const file of files) {
            if (
                file.state.props.children !== "Nộp lưu cơ quan"
            )
                continue;
            newFiles.push(file);
        }

        return newFiles;
    };

    return (
        <BasePage
            parent={parent}
            buttonFuctions={<ButtonFuctions />}
            current={current}
            addNewFile={false}
            filter={filter}
            eOffice={false}
        />
    );
};


export default DuyetHoSoTTHC
