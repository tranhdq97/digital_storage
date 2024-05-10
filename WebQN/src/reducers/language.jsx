const initialState = {
    language: []
}

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LANGUAGE_SUCCESS':
            return {language: action.payload}
        default:
            return state
    }
}

export default languageReducer
