import {
    SIGNUP_USER,
    SIGNIN_USER,
    GET_USER,
    SIGNOUT_USER,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case SIGNUP_USER:
            return {...state, register: action.payload }
        case SIGNIN_USER:
            return { ...state, authToken: action.payload.data.authorization }
        case GET_USER:
            return {...state, userData: action.payload.data.response }
        case SIGNOUT_USER:
            return {...state, authToken:'',  userData:''}
        default:
            return state;
    }
}