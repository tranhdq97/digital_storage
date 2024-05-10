const initialState = {
    organId: []
}

const organIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ORGAN_ID_SUCCESS':
            return {organId: action.payload}
        default:
            return state
    }
}

export default organIdReducer
