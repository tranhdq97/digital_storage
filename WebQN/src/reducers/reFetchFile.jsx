const reFetchFileReducer = (state = { fetchFileFunction: null }, action) => {
    switch (action.type) {
        case "ADD_FETCH_FILE_ACTION": {
            return {
                fetchFileFunction: action.fetchFileFunction,
            }
        }
        default:
            return state
    }
}

export default reFetchFileReducer