import BasePage from "../BasePage";


const HoSoBiTraVeCoQuan = () => {
    const parent = [
        { title: "Lưu trữ cơ quan",
         //link: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop"
    },
    ]

    const current = {
        link: "/luu-tru-co-quan/ho-so-bi-tra-ve",
        title: "Hồ sơ bị trả về"
    }

    const filter = (files) => {

        const newFiles = []
        for (const file of files) {
            console.log(file)
            if (file.state.props.children === "Nộp lưu lịch sử bị trả về") {
                newFiles.push(file)

            }
        }

        return newFiles
    }
    return <BasePage parent={parent} current={current} filter={filter} />

}
export default HoSoBiTraVeCoQuan;
