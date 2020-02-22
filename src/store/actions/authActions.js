import * as actionTypes from "./actionTypes";
import axios from 'axios';
import request from '../../axios-order';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESSFULL,
        idToken: token,
        userId: userId,
        userEmail: email
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const hideNotification = () => {
    return{
        type: actionTypes.HIDE_NOTIFICATION
    }
}

export const userData = (data) => {
    let name = null;
    let account = null;
    for (let obj in data) {
       name = data[obj].name
       account = data[obj].account
    }
    return {
        type: "SET_USERNAME",
        name: name,
        account: account,
    }
}

export const setUserData = (email) => {
    return dispatch => {
        const queryparam = '?orderBy="email"&equalTo="' + email + '"';
        request.get('/customers.json' + queryparam)
            .then(res => dispatch(userData(res.data)))
            .catch(error => console.log(error))
    }
}

export const signUpCustomer = (customerData) => {
    return dispatch => {
        request.post('/customers.json', customerData)
            .then(res => {
                console.log(res)
            })
            .catch(error => console.log(error))
    }
}

export const authTimeout = (expTime) => {
    return (dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime)
    })
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiredIn')
    return ({
        type: actionTypes.AUTH_LOGOUT
    })
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = '';
        isSignUp ? url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrf2FxGPUiIhdL1V7opP6GGJwFxaX6l_c' : url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrf2FxGPUiIhdL1V7opP6GGJwFxaX6l_c';
        axios.post(url, authData)
            .then(res => {
                const expiredIn = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expiredIn', expiredIn);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.email))
                dispatch(authTimeout(expiredIn));
            })
            .catch(error => dispatch(authFailed(error.response.data.error)))
    }
}