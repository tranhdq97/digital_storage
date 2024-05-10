import BasePage from "../BasePage";
const KhoHoSoTTHC = () => {
    const parent = [
        {
            title: "Lưu trữ tổ chức, cá nhân",
            // link: "/kho-luu-tru-to-chuc-ca-nhan/kho-ho-so-thuc-hien-thu-tuc-hanh-chinh",
        },
    ];

    const current = {
        link: "/kho-luu-tru-to-chuc-ca-nhan/kho-ho-so-thuc-hien-thu-tuc-hanh-chinh",
        title: "Kho hồ sơ thực hiện thủ tục hành chính",
    };

    const filter = (files) => {
        const newFiles = [];
        for (const file of files) {
            if (
                file.state.props.children !== "Lưu trữ cơ quan"
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
            filter={filter}
            eOffice={false}
        />
    );
};


export default KhoHoSoTTHC