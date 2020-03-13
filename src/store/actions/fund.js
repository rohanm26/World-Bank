import * as actionTypes from './actionTypes.js';
import request from '../../axios-order';

export const addPayeeFailed = error => {
    return {
        type: actionTypes.ADD_PAYEE_FAILED,
        error: error
    }
}

export const searchPayeeStart = () => {
    return {
        type: actionTypes.SEARCH_PAYEE_START
    }
}

export const payeeDetailsSuccessfull = (data) => {
    return {
        type: actionTypes.PAYEE_DETAILS_SUCCESS,
        payee: data
    }
}

export const payeeDetailsFailed = (error) => {
    return {
        type: actionTypes.PAYEE_DETAILS_FAILED,
        error: error
    }
}

export const searchPayee = (token, id, name) => {
    return dispatch => {
        dispatch(searchPayeeStart());
        const queryParam = '?auth=' + token + '&orderBy="name"&equalTo="' + name + '"';
        request.get(`/customers/${id}/payees.json` + queryParam)
            .then(res => {
                let payeeDetails = null;
                for (let key in res.data) {
                    payeeDetails = res.data[key]
                }
                payeeDetails !== null ? dispatch(payeeDetailsSuccessfull(payeeDetails)) : dispatch(payeeDetailsFailed("Payee doesn't exist"))
            })
            .catch(error => dispatch(payeeDetailsFailed(error)))
    }
}

export const searchCustomer = (token, name, customer) => {
    return dispatch => {
        dispatch(searchPayeeStart());
        const queryParam = '?auth=' + token + '&orderBy="name"&equalTo="' + name + '"';
        request.get("/customers.json" + queryParam)
            .then(res => {
                if (Object.keys(res.data).length !== 0) {
                    let payee;
                    for (let key in res.data) {
                        payee = res.data[key]
                    }
                    payee.account !== customer ? dispatch(payeeDetailsSuccessfull(payee)) : dispatch(payeeDetailsFailed("Can't transfer to same account"))
                }
                else {
                    dispatch(payeeAddFailed("Payee doesn't exist"))
                }
            })
            .catch(error => dispatch(payeeDetailsFailed(error)))
    }
}

export const payeeAddSuccess = () => {
    return {
        type: actionTypes.ADD_PAYEE_SUCCESS
    }
}

export const clearTransfer = () => {
    return {
        type: actionTypes.CLEAR_TRANSFER
    }
}

export const payeeAddFailed = (error) => {
    return {
        type: actionTypes.ADD_PAYEE_FAILED,
        error: error
    }
}

export const addPayee = (token, accountId, payee) => {
    return dispatch => {
        request.post(`/customers/${accountId}/payees.json?auth=` + token, payee)
            .then(res =>
                console.log(res.data),
                dispatch(payeeAddSuccess()))
            .catch(error => dispatch(payeeAddFailed(error)))
    }
}

export const transferStart = () => {
    return {
        type: actionTypes.TRANSFER_START
    }
}
export const transferSuccess = () => {
    return {
        type: actionTypes.TRANSFER_SUCCESS
    }
}
export const transferFailed = (error) => {
    return {
        type: actionTypes.TRANSFER_FAILED,
        error: error
    }
}

export const transferRecipient = (token, account, transfer) => {
    return dispatch => {
        const query = '?auth=' + token + '&orderBy="account"&equalTo="' + account + '"';
        request.get(`/customers.json` + query)
            .then(res => {
                if (Object.keys(res.data).length !== 0) {
                    let payeeId;
                    for (let key in res.data) {
                        payeeId = key;
                    }
                    request.post(`/customers/${payeeId}/transfers.json?auth=` + token, transfer)
                        .then(res => console.log(res))
                        .catch(error => console.log(error))
                }
            })
    }
}

export const transferFund = (token, id, transfer, account) => {
    return dispatch => {
        dispatch(transferStart());
        request.post(`/customers/${id}/transfers.json?auth=` + token, transfer)
            .then(res => dispatch(transferSuccess()))
            .catch(error => dispatch(transferFailed(error)));
        dispatch(transferRecipient(token, account, transfer))
    }
}