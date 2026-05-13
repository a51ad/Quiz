export const FETCH_USER_LOGIN_SUCCSESS = 'FETCH_USER_LOGIN_SUCCSESS'
export const USER_LOGOUT_SUCCSESS = 'USER_LOGOUT_SUCCSESS'

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCSESS,
        payload: data
    }
}

export const doLogout = () => {
    return {
        type: USER_LOGOUT_SUCCSESS
    }
}