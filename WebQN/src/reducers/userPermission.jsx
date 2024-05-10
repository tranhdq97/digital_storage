const userPermissionReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_USER_PERMISSION":
            return action.payload
        default:
            return state
    }
}

export default userPermissionReducer
