import BasePage from "../BasePage";

const HoSoNopLuuBiTraVe = () => {
    const parent = [
        { title: "Thu thập và nộp lưu",
          //link: "/thu-thap-va-nop-luu/thu-thap-ho-so"
         },
    ]

    const current = {
        link: "/thu-thap-va-nop-luu/ho-so-nop-luu-bi-tra-ve",
        title: "Hồ sơ bị trả về"
    }

    const filter = (files) => {

        // console.log(allOrganStorageFiles)
        const newFiles = []
        for (const file of files) {
            console.log(file)
            if (file.state.props.children === "Nộp lưu cơ quan bị trả về") {
                newFiles.push(file)
                // for (const fileS of allOrganStorageFiles) {
                //     console.log(fileS)
                //     if (fileS.file_id === file.id)

                // }
            }
        }

        return newFiles
    }
    return <BasePage parent={parent} current={current} filter={filter} />
}

export default HoSoNopLuuBiTraVe;
