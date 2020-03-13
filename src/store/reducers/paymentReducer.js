import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    history: null,
    error: null
}

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PAYMENT_HISTORY_START:
            return ({
                ...state,
                loading: true
            })
        case actionTypes.GET_PAYMENT_HISTORY_SUCCESS:
            return ({
                ...state,
                history: action.history,
                loading: false
            })
        case actionTypes.GET_PAYMENT_HISTORY_FAILED:
            return ({
                ...state,
                error: action.error,
                loading: false
            })
            default:
            return state;
    }
}

export default paymentReducer;