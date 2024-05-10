const ModalModificationDocumentAddDocumentReducer = (state = { state: false, id: null }, action) => {
    switch (action.type) {
        case "open_modal_confirm_bmcl_bosunghosotailieu":
            return {
                ...state,
                state: true,
                id: action.id,
            }
        case "close_modal_confirm_bmcl_bosunghosotailieu":
            return {
                ...state,
                state: false,
                id: null
            }
        default:
            return state
    }
}

export default ModalModificationDocumentAddDocumentReducer
