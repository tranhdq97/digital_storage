import BasePage from "../BasePage";
const TaoHoSoTTHC = () => {
    const parent = [
        {
            title: "Lưu trữ tổ chức, cá nhân",
            // link: "/kho-luu-tru-to-chuc-ca-nhan/tao-ho-so-thuc-hien-thu-tuc-hanh-chinh",
        },
    ];

    const current = {
        link: "/kho-luu-tru-to-chuc-ca-nhan/tao-ho-so-thuc-hien-thu-tuc-hanh-chinh",
        title: "Tạo hồ sơ thực hiện thủ tục hành chính",
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
            eOffice={false}
        />
    );
};


export default TaoHoSoTTHC
