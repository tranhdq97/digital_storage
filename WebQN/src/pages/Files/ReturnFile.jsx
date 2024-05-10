import BasePage from "../BasePage";

const ReturnFile = () => {
    const parent = [
        { title: "Hồ sơ tài liệu",
         // link: "/ho-so/tao-ho-so-dien-tu" 
        },
    ]

    const current = {
        link: "/ho-so/ho-so-bi-tra-ve",
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
    return <BasePage parent={parent} current={current} filter={filter}/>
}

export default ReturnFile;