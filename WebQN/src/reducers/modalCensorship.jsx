const modalCensorshipReducer = (state = { state: false, id: null }, action) => {
    switch (action.type) {
        case "open_modal_confirm_nopluucoquan":
            return {
                ...state,
                state: true,
                id: action.id,
                current_state: parseInt(action.current_state)
            }
        case "close_modal_confirm_nopluucoquan":
            return {
                ...state,
                state: false,
                id: action.id
            }
        default:
            return state
    }
}

export default modalCensorshipReducer
