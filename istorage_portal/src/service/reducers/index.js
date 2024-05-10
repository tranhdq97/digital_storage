import { combineReducers } from 'redux'
import headerReducer from './headerReducer'
import cartReducer from './cartReducer'
import userReducer from './userReducer'
const rootReducer = combineReducers({
    header: headerReducer,
    cart: cartReducer,
    user: userReducer,
})

export default rootReducer
