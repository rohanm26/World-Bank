import * as actionTypes from './actionTypes';
import request from '../../axios-order';

export const paymentHistoryStart = () => {
    return {
        type: actionTypes.GET_PAYMENT_HISTORY_START
    }
}
export const paymentHistorySuccess = (data) => {
    return {
        type: actionTypes.GET_PAYMENT_HISTORY_SUCCESS,
        history: data
    }
}
export const paymentHistoryFailed = (error) => {
    return {
        type: actionTypes.GET_PAYMENT_HISTORY_FAILED,
        error: error
    }
}

export const getPaymentHistory = (token, accountId, account) => {
    console.log(account)
    return dispatch => {
        dispatch(paymentHistoryStart())
        request.get(`customers/${accountId}/transfers.json?auth=` + token)
            .then(res => {
                let history = [];
                for (let i in res.data) {
                    history.push({
                        id: Math.ceil(Math.random() * 89675),
                        ...res.data[i]
                    })
                    console.log(res.data)
                }
                history.length === 0 ? dispatch(paymentHistoryFailed("No Transactions")) : dispatch(paymentHistorySuccess(history))
            })
            .catch(error => dispatch(paymentHistoryFailed(error)))
    }
}