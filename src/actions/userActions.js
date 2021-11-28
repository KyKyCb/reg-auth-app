
import { toast } from "react-toastify"


export const SEND_DATA = 'SEND_DATA'
export const SEND_END = 'SEND_END'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_EXIT = 'USER_EXIT'
export const USER_REGISTERED = 'USER_REGISTERED'
export const USER_GET_SECRET = 'USER_GET_SECRET'

export const USER_GET_ERROR = 'USER_GET_ERROR'


const RegistrationURL = 'https://api.topmediagroups.com/api/v1/users'

const AuthURL = 'https://api.topmediagroups.com/login'

const SecretURL = 'https://api.topmediagroups.com/api/v1/tasks'

const registerUser = (userData)=>{
    return fetch(RegistrationURL, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
          }
    })
}

const authUser = (userData)=>{
    return fetch(AuthURL, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
          }
    })
}

const sendSecretWord = (userData)=>{
    const user = getUserFromLocalStorage()

    return fetch(SecretURL, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user.authKey.Authorization,
          }
    })
}

const insertUserIntoLocalStorage = (userData)=>{
    localStorage.setItem('user', JSON.stringify(userData))
}

const getUserFromLocalStorage = () =>{
    const user = JSON.parse(localStorage.getItem('user'))
    return user
}

const insertKeyIntoUser = (userKey)=>{
    const user = getUserFromLocalStorage()
    user.authKey = userKey
    localStorage.setItem('user', JSON.stringify(user))
}

const userSendData = ()=>{
    return {type: SEND_DATA}
}

const sendEnd = ()=>{
    return {type: SEND_END}
}

const userRegistered = () =>{
    return {type: USER_REGISTERED}
}

const userLogin = ()=>{
    return {type: USER_LOGIN}
}

const userExit = ()=>{
    return {type: USER_EXIT}
}

const userGetSecret = ()=>{
    return {type: USER_GET_SECRET}
}

const userError = (error) =>{
    return {type: USER_GET_ERROR, payload: error}
}

const asyncUserRegisterAction = (userData)=>{
    return async (dispatch)=>{
        try {
            dispatch(userSendData())

            const response = await registerUser(userData)

            if(response.status === 200 || response.status === 201){
                const result = await response.json()

                if(result.status === "success"){
                    dispatch(sendEnd())

                    insertUserIntoLocalStorage(userData)

                    dispatch(userRegistered())
                } else{
                    throw new Error(result)
                }

            }else{
                throw new Error('Status code: ' + response.status)
            }

        } catch (error) {
            dispatch(userError())
            toast.error('Whoops, something went wrong')
            console.error(error)
        }
    }
}

const asyncUserAuthAction = (userData)=>{
    return async (dispatch)=>{
        try {
            dispatch(userSendData())

            const response = await authUser(userData)

            if(response.status === 200 || response.status === 201){
                const result = await response.json()

                if(result.status === "success"){
                    dispatch(sendEnd())

                    insertKeyIntoUser(result.message)

                    dispatch(userLogin())
                } else{
                    throw new Error(result)
                }

            }else{
                throw new Error('Status code: ' + response.status)
            }
        } catch (error) {
            dispatch(userError())
            toast.error('Whoops, something went wrong')
            console.error(error)
        }
    }
}

const asyncUserSendSecretWordAction = (userData)=>{
    return async (dispatch)=>{
        try {
            dispatch(userSendData())

            const response = await sendSecretWord(userData)

            if(response.status === 200 || response.status === 201){
                const result = await response.json()

                if(result.code === 201 && result.status === "success"){
                    dispatch(sendEnd())
                    dispatch(userGetSecret())
                } else{
                    throw new Error(JSON.stringify(result))
                }

            }else{
                throw new Error('Status code: ' + response.status)
            }
        } catch (error) {
            dispatch(userError(error))
            toast.error('Whoops, something went wrong')
            console.error(error)
        }
    }
}

export {asyncUserRegisterAction, asyncUserAuthAction, asyncUserSendSecretWordAction, userExit}