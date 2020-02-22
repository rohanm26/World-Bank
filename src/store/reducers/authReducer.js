import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    token: null,
    expiredIn: null,
    user:  null,
    userId: null,
    userEmail: null,
    userAccount: null,
    loading: false,
    error: null,
    showNotification: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return ({
                ...state,
                loading: true
            })
        case actionTypes.AUTH_SUCCESSFULL:
            return ({
                ...state,
                token: action.token,
                userId: action.localId,
                expiredIn: action.expiredIn,
                userEmail: action.userEmail,
                isLoggedIn: true,
                loading: false,
                showNotification: "success"
            })
        case actionTypes.SET_USERNAME:
            return({
                ...state,
                user: action.name,
                userAccount: action.account
            })
        case actionTypes.AUTH_FAILED:
            return ({
                ...state,
                error: action.error,
                showNotification: "error",
                loading: false
            })
        case actionTypes.HIDE_NOTIFICATION:
            return({
                ...state,
                showNotification: null
            })
        case actionTypes.AUTH_LOGOUT:
            return({
                ...state,
                isLoggedIn: false,
                showNotification: "success"
            })
        default:
            return state;
    }
}

export default authReducer;