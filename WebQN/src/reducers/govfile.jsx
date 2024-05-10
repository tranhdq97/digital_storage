const initialState = {
    id: null,
    data: null,
}

const govfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GOV_FILE':
            return {id: action.id, data: action.data}
        default:
            return state
    }
}

export default govfileReducer
