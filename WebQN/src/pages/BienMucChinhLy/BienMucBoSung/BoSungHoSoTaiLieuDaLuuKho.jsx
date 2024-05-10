import BasePage from "src/pages/BasePage";
import ButtonFuctions from "src/pages/LuuTruCoQuan/Button";
import { ENUM_STATE_BMCL, ENUM_STATE_FILE } from "src/storage/Storage";

const BoSungHoSoTaiLieuDaLuuKho = () => {
    const parent = [
        {
            title: "Biên mục chỉnh lý",
            // link: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
        },
        {
            title: "Biên mục bổ sung",
           //  link: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu",
        },
    ];

    const current = {
        link: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu-da-luu-kho",
        title: "Bổ sung hồ sơ tài liệu đã lưu kho",
    };


    const filter = (files) => {
        const existFiles = {}
        const newFiles = []
        for (const file of files) {
            const id = file.id
            if(file.state.props.children === ENUM_STATE_FILE.LUU_TRU_CO_QUAN) {
                newFiles.push(file)
                existFiles[id] = true
            }
        }
        return newFiles
    }

    return (
        <BasePage
            parent={parent}
            current={current}
            filter={filter}
            eOffice={false}
            buttonFuctions={
                <ButtonFuctions
                clickApprove={false}
                buttonName="Tạo yêu cầu"
                />}
            currentStateModal={ENUM_STATE_BMCL.BMCL_YEU_CAU_BO_SUNG_TAI_LIEU_DA_LUU_KHO}
        />
    );
};

export default BoSungHoSoTaiLieuDaLuuKho;
