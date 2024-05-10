export const LoginAction = (mail, username) => {
    return {
        type: 'LOGIN',
        payload: {
            mail,
            username
        },
    }
}

export const LogoutAction = () => {
    return {
        type: 'LOGOUT',
    }
}
