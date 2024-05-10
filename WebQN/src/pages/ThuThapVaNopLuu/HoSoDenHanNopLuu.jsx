import BasePage from "../BasePage";
import { ENUM_STATE_FILE } from "src/storage/Storage";
const HoSoDenHanNopLuu = () => {
    const parent = [
        { title: "Thu thập và nộp lưu", 
         //link: "/thu-thap-va-nop-luu/thu-thap-ho-so" 
        },
    ]

    const current = {
        link: "/thu-thap-va-nop-luu/ho-so-den-han-nop-luu",
        title: "Hồ sơ đến hạn nộp lưu"
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
            if (file.end_date === null || file.end_date === undefined || ( file.state.props.children !== ENUM_STATE_FILE.DONG) ) continue

            if (dateDiff(file.end_date) >= 1)
                newFiles.push(file)
        }

        return newFiles
    }


    return <BasePage parent={parent} current={current} filter={filter} />
}

export default HoSoDenHanNopLuu;