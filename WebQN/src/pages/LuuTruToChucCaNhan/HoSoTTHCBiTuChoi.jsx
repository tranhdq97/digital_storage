
import BasePage from "../BasePage";
const HoSoTTHCBiTuChoi = () => {
    const parent = [
        {
            title: "Lưu trữ tổ chức, cá nhân",
            // link: "/kho-luu-tru-to-chuc-ca-nhan/ho-so-thuc-hien-thu-tuc-hanh-chinh-bi-tu-choi",
        },
    ];

    const current = {
        link: "/kho-luu-tru-to-chuc-ca-nhan/ho-so-thuc-hien-thu-tuc-hanh-chinh-bi-tu-choi",
        title: "Hồ sơ thực hiện thủ tục hành chính bị từ chối",
    };

    const filter = (files) => {
        const newFiles = [];
        for (const file of files) {
            if (
                file.state.props.children !== "Nộp lưu cơ quan bị trả về"
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
            addNewFile={false}
            filter={filter}
            eOffice={false}
        />
    );
};


export default HoSoTTHCBiTuChoi
