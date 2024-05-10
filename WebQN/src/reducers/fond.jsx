const initialState = {
    fond: []
}

const fondReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FOND_SUCCESS':
            return {fond: action.payload}
        default:
            return state
    }
}

export default fondReducer
