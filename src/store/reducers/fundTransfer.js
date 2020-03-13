import * as actionTypes from '../actions/actionTypes';

const initialState = {
    payee: null,
    loading: false,
    payeeAdded: false,
    transferSuccess: null,
    error: false
}

const fundTransfer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_PAYEE_START:
            return ({
                ...state,
                loading: true
            })
        case actionTypes.PAYEE_DETAILS_SUCCESS:
            return ({
                ...state,
                payee: action.payee,
                loading: false,
                error: false
            })
        case actionTypes.PAYEE_DETAILS_FAILED:
            return ({
                ...state,
                error: action.error,
                loading: false
            })
        case actionTypes.TRANSFER_START:
            return ({
                ...state,
                loading: true
            })
        case actionTypes.TRANSFER_SUCCESS:
            return ({
                ...state,
                transferSuccess: true,
                loading: false
            })
        case actionTypes.TRANSFER_FAILED:
            return ({
                ...state,
                error: action.error,
                loading: false
            })
        case actionTypes.ADD_PAYEE_SUCCESS:
            return ({
                ...state,
                payeeAdded: true,
                loading: false
            })
        case actionTypes.ADD_PAYEE_FAILED:
            return ({
                ...state,
                error: action.error,
                loading: false
            })
        case actionTypes.CLEAR_TRANSFER:
            return ({
                state: initialState
            })
        default:
            return state
    }
}

export default fundTransfer;