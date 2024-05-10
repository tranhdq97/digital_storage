import BasePage from "src/pages/BasePage";

const DSHoSoChoTieuHuy = ()=>{
    const parent = [
        {title: "Tiêu Hủy Hồ Sơ", link: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy"},
    ]

    const current = {
        link: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy",
        title: "Danh sách hồ sơ chờ tiêu hủy"
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
            const yearMaintenance = parseInt(file.maintenance.split(' ')[0])
            if (dateDiff(file.end_date) >= yearMaintenance)
                newFiles.push(file)
        }

        return newFiles
    }


    return <BasePage parent={parent} current={current} filter={filter} />
}

export default DSHoSoChoTieuHuy;
