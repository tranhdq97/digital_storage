import { HEADER_FIXED, HEADER_UNFIXED, SET_HEADER_FIXED, SET_HEADER_UNFIXED } from '../key'
const INITIAL_STATE = HEADER_FIXED

const headerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_HEADER_FIXED:
            return HEADER_FIXED
        case SET_HEADER_UNFIXED:
            return HEADER_UNFIXED
        default:
            return state
    }
}

export default headerReducer
