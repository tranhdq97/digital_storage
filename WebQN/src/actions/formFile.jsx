export const CloseFile = () => {
    return {
        type: "CLOSE_FILE"
    }
}

export const CreateFile = (category, plan) => {
    return {
        type: "CREATE_FILE",
        category_file: category,
        plan: plan
    }
}

export const OpenFile = (id = null) => {
    return {
        type: "WATCH_FILE",
        id: id
    }
}

export const EditFile = (id = null) => {
    return {
        type: "EDIT_FILE",
        id: id
    }
}
