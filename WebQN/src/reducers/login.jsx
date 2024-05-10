const loginReducer = (initialState = localStorage.getItem('isLogin'), action) =>{
    switch (action.type) {
        case 'LOGINED':{
            localStorage.setItem('isLogin', "true");
            return "true";
        }
        case 'LOGOUT':{
            localStorage.setItem('isLogin', "false");
            localStorage.removeItem('userID');
            return "false";
        }
        default:
            return initialState;
    }
}

export default loginReducer;
