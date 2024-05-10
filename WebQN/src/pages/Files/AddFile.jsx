import BasePage from "../BasePage";

const AddFile = ()=>{
    const parent = [
        {title: "Tìm kiếm nâng cao",
         // link: "/ho-so/tao-ho-so-dien-tu"
        },
    ]

    const current = {
        link: "/ho-so/tao-ho-so-dien-tu",
        title: "Tìm kiếm nâng cao"
    }

    return <BasePage parent={parent} current={current} addNewFile={false} />
}

export default AddFile;