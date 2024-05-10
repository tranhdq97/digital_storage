import BasePage from "src/pages/BasePage";

const HetThoiHanBaoQuan = ()=>{
    const parent = [
        {title: "Tiêu Hủy Hồ Sơ / Danh sách hồ sơ chờ tiêu hủy",
         //link: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy/het-thoi-han-bao-quan"
        },
    ]

    const current = {
        link: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy/het-thoi-han-bao-quan",
        title: "Hồ sơ hết thời hạn bảo quản"
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
            if(file.maintenance === "Vĩnh viễn") continue;
            const yearMaintenance = parseInt(file.maintenance.split(' ')[0])
            if (dateDiff(file.start_date) >= yearMaintenance)
                newFiles.push(file)
        }

        return newFiles
    }


    return <BasePage parent={parent} current={current} filter={filter} />
}

export default HetThoiHanBaoQuan;
