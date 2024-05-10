const modalStoreOrganReducer = (state = { state: false, id: null }, action) => {
    switch (action.type) {
        case "open_modal_confirm_luutrucoquan":
            return {
                ...state,
                state: true,
                id: action.id,
                current_state: parseInt(action.current_state)
            }
        case "close_modal_confirm_luutrucoquan":
            console.log(111)
            return {
                ...state,
                state: false,
                id: action.id
            }
        default:
            return state
    }
}

export default modalStoreOrganReducer
