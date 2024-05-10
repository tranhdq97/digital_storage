import { combineReducers } from 'redux'
import headerReducer from './headerReducer'
import cartReducer from './cartReducer'
const rootReducer = combineReducers({
    header: headerReducer,
    cart: cartReducer
})

export default rootReducer
