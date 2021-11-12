import * as ActionTypes from '../actionTypes';

export default function reducer(state = { user: null, token: null }, action){

    switch (action.type) {
        case ActionTypes.SET_USER:
            localStorage.setItem('payroll_token', JSON.stringify(action.payload.token));
            localStorage.setItem('payroll_user', JSON.stringify(action.payload.user));
            return { ...state, ...action.payload };
        case ActionTypes.UPDATE_USER:
            let token = localStorage.getItem('payroll_token');
            localStorage.setItem('payroll_user', JSON.stringify(action.payload.user));
            // start pusher channel
            return {...state, user: action.payload.user, token: JSON.parse(token)}
        case ActionTypes.CLEAR_USER:
            localStorage.removeItem('payroll_token');
            localStorage.removeItem('payroll_user');
            return { user: null, token: null };
        default:
            return state;
    }

}