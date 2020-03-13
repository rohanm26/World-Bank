import * as actionTypes from "./actionTypes";
import axios from 'axios';
import request from '../../axios-order';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESSFULL,
        token: token,
        id: id,
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const checkAuth = () => {
    return dispatch => {
        console.log(localStorage,'hh')
        if(!localStorage.getItem('token')){
            console.log("trigeer 1")
            dispatch(logout());
        }
        else{
            if(new Date(localStorage.getItem('expiredIn')) < new Date()){
                console.log("trigeer 2")
                dispatch(logout());
            }
            else{
                dispatch(authSuccess(localStorage.getItem('token'),localStorage.getItem('userId')))
            }
        }
    }
}

export const hideNotification = () => {
    return{
        type: actionTypes.HIDE_NOTIFICATION
    }
}

export const userData = (data) => {
    let accountDetails;
    for(let key in data){
        accountDetails = {
            ...data[key],
            accountId: key
        }
    }
    console.log(accountDetails)
    return {
        type: "SET_USERPROFILE",
        account : accountDetails
    }
}

export const setUserData = (id,token) => {
    return dispatch => {
        const queryparam = '?auth='+token+'&orderBy="userId"&equalTo="' + id + '"';
        request.get('/customers.json' + queryparam)
        .then(res => dispatch(userData(res.data)))
            .catch(error => console.log(error))
    }
}

export const signUpCustomer = (customerData) => {
    return dispatch => {
        request.post('/customers.json', customerData)
            .then(res => console.log(res))
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
    console.log("trigeer 3")
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
                console.log(res)
                const expiredIn = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                console.log(expiredIn,'expiredIn')
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expiredIn', expiredIn);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(authTimeout(res.data.expiresIn * 1000));
            })
            .catch(error => dispatch(authFailed(error.response.data.error)))
    }
}