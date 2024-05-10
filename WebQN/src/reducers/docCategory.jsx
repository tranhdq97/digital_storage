const docCategoryReducer = (state = false, action) => {
    switch (action.type) {
        case "open":
            return {
                state: true,
                id: action.id
            }
        case "close": {
            return {
                state: false,
                id: action.id
            }
        }
        default:
            return state
    }
}

export default docCategoryReducer
