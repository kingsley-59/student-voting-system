import { postDataAPI } from "../../utils/api";
import { handleAPIRequestErrors } from "./global";
import { TYPES } from "./types";


export const confirmRegNo = ({ regNo }) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.LOADING, payload: { loadingConfirmRegNo: true } })
        const res = postDataAPI('confirm', {regNo});
        dispatch({ type: TYPES.LOADING, payload: {} })
        return res;

    } catch (err) {
        handleAPIRequestErrors({ err, dispatch })
    }
}

export const setPassword = ({ regNo, password, cpassword }) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.LOADING, payload: { loadingSetPassword: true } })
        const res = postDataAPI('set-password', { regNo, password })
        dispatch({ type: TYPES.LOADING, payload: {} })
        return res;

    } catch (err) {
        handleAPIRequestErrors({ err, dispatch })
    }
}

export const isVotingTime = () => async (dispatch) => {
    try {
        dispatch({ type: TYPES.LOADING, payload: { pageLoading: true } })
        const res = { status: 500, data: { isVotingTime: true } }
        dispatch({ type: TYPES.LOADING, payload: {} })
        return res;

    } catch (err) {
        handleAPIRequestErrors({ err, dispatch })
    }
}
export const loginUser = ({ regNo, password }) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.LOADING, payload: { loggingIn: true } })
        const res = { status: 200, data: { access_token: 'gttreterter eryeryeryeryeryeryr', user: { role: 'user' }, msg: 'Login Success!' } }

        localStorage.setItem("userLoggedIn", true)
        dispatch({
            type: TYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        dispatch({ type: TYPES.ALERT, payload: { success: res.data.msg } })
        dispatch({ type: TYPES.LOADING, payload: {} })
        return res;

    } catch (err) {
        handleAPIRequestErrors({ err, dispatch })
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('userLoggedIn')
        const res = await postDataAPI('/logout')
        dispatch({ type: TYPES.ALERT, payload: { success: res.data.msg } })
        dispatch({ type: TYPES.AUTH, payload: {} })
        window.location.href = "/login"
    } catch (err) {
        handleAPIRequestErrors({ err, dispatch })
    }
}


export const refreshToken = ({ message }) => async (dispatch) => {
    
    dispatch({ type: TYPES.LOADING, payload: { pageLoading: true } })
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn) {
        try {
            const res = await postDataAPI('refresh_token')
            dispatch({
                type: TYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })
            dispatch({ type: TYPES.LOADING, payload: {} })
        } catch (err) {
            localStorage.removeItem('userLoggedIn')
            window.location.href = '/login'
        }
    } else {
        dispatch({ type: TYPES.ALERT, payload: { info: message } })
        return { notLoggedIn: true }
    }
}