export const FETCH_USER_LOGIN_SUCCSESS = 'FETCH_USER_LOGIN_SUCCSESS'

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCSESS,
        payload: data
    }
}