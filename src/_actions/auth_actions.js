import axios from 'axios';
import {
    SIGNIN_USER,
    SIGNUP_USER,
    GET_USER,
    LOGOUT_USER

} from './types';
import { USER_SERVER } from '../components/Config.js';

const axiosConfig = {
    headers:{
        "Content-Type": "application/json"
    }
}

export function signUp(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/signup`, dataToSubmit, axiosConfig)
        .then(response => response.data);
    
    return {
        type: SIGNUP_USER,
        payload: request
    }
}

export function signIn(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit, axiosConfig)
        .then(response => response.data)
    
    return {
        type: SIGNIN_USER,
        payload: request
    }
}

export function getUser(token){

    const setTokenInHeader = {
        headers:{
            "Content-Type": "application/json",
            "Authorization": token
        }
    }

    const request = axios.get(`${USER_SERVER}/api/v1/user`, setTokenInHeader)
        .then(response => response.data)
    
    return {
        type: GET_USER,
        payload: request
    }
}