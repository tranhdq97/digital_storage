const INITIAL_STATE = {
    ids: [],
    open: false,
    reFetchData: null
}

const ModalRecoverFileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "open_modal_recover_file":
            return {
                ...state,
                ids: action.ids,
                open: true,
                reFetchData: action.reFetchData
            }
        case "close_modal_recover_file":
            return INITIAL_STATE;
        default:
            return state
    }
}

export default ModalRecoverFileReducer
