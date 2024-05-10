const initialState = {
    maintance: []
}

const maintanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MAINTANCE_SUCCESS':
            return {maintance: action.payload}
        default:
            return state
    }
}

export default maintanceReducer
