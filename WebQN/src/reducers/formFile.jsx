const initialState = {
    state: "CLOSE_FILE",
    id:null
}

const formFileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CLOSE_FILE":
            return {
                state: "CLOSE_FILE",
                id: null
            }
        case "WATCH_FILE":
            return {
                state: "WATCH_FILE",
                id: action.id
            }
        case "EDIT_FILE":
            return {
                state: "EDIT_FILE",
                id: action.id
            }
        case "CREATE_FILE":
            return {
                state: "CREATE_FILE",
                id: null,
                category_file: action.category_file,
                plan: action.plan
            }

        default:
            return state
    }
}

export default formFileReducer
