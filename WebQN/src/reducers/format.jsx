const initialState = {
    format: []
}

const formatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FORMAT_SUCCESS':
            return {format: action.payload}
        default:
            return state
    }
}

export default formatReducer
