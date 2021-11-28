import {
    SEND_DATA, 
    USER_LOGIN, 
    SEND_END,
    USER_REGISTERED,
    USER_GET_SECRET,
    USER_GET_ERROR,
    USER_EXIT
} from '../actions/userActions'

const initialState = {
    isDataFetched: false,

    isLoggedIn: false,
    isUserCreateAccount: false,
    
    isSecretGet: false,
    userError: ''
}

const userReducer = (state = initialState, action)=>{
    switch(action.type){

        //эти поля созданы на случай, если понадобится добавить действие для ожидания
        case SEND_DATA:
            return {...state, isDataFetched: true}
        case SEND_END:
            return {...state, isDataFetched: false}
        //

        case USER_LOGIN:
            return {...state, isLoggedIn: true, isUserCreateAccount: true}
        case USER_EXIT:
            return initialState
        case USER_REGISTERED:
            return {...state, isUserCreateAccount: true}
        case USER_GET_SECRET:
            return {...state, isSecretGet: true}

        //это поле создано для возможной обработки ошибки
        case USER_GET_ERROR:
            return {...state, isDataFetched: false, userError: JSON.stringify(action.payload)}
        default:
            return state
    }
}

export default userReducer