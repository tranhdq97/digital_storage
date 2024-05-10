const initialState = {
    state: "close",
}

const sideBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CLOSE":
            return {
                state: "close",
            }
        case "OPEN":
            return {
                state: "open",
                data: action.payload,
            }
        default:
            return state
    }
}

export default sideBarReducer
