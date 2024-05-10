import BasePage from "../BasePage";
import ButtonFuctions from "../LuuTruCoQuan/Button";

const HoSoTaiLieuGiaoNopLS = () => {
    const parent = [
        { title: "Lưu trữ lịch sử",
       //  link: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop"
    },
    ]

    const current = {
        link: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop",
        title: "Hồ sơ tài liệu giao nộp (Lịch sử)"
    }

    const filter = (files) => {
        const newFiles = []

        let today = new Date()
        const y = today.getFullYear();
        const m = today.getMonth() + 1; // Months start at 0!
        const d = today.getDate();

        today = new Date(`${y}-${m}-${d}`)
        const dateDiff = (start_date, end_date = today) => {
            start_date = new Date(start_date)
            const diffTime = end_date - start_date
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays / 365
        }

        for (const file of files) {
            if (file.state.props.children !== 'Nộp lưu lịch sử') continue;
            if (file.maintenance !== "Vĩnh viễn") continue;
            // if (file.end_date === null || file.end_date === undefined || (file.state.props.children !== 'Nộp lưu lịch sử' || file.maintenance !== "Vĩnh viễn"))
            //     continue
            // if (dateDiff(file.end_date) >= 10)
            newFiles.push(file)
        }

        return newFiles
    }


    return <BasePage parent={parent} current={current} filter={filter} isCheckBox={false} buttonFuctions={<ButtonFuctions />} />
}

export default HoSoTaiLieuGiaoNopLS;
