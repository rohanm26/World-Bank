import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './reducers/authReducer';
import thunk from 'redux-thunk';
import fundTransfer from './reducers/fundTransfer';
import paymentReducer from './reducers/paymentReducer';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth : authReducer ,
    fund : fundTransfer,
    payment: paymentReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;