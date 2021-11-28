
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import AuthForm from './AuthForm/AuthForm';
import RegForm from './RegForm/RegForm';
import SecretWordForm from './SecretWordForm/SecretWordForm';
import IntroPage from './IntroPage/IntroPage';

import useWindowSize from '../resizeFunc/useWindowSize';
import {
    asyncUserRegisterAction, 
    asyncUserAuthAction, 
    asyncUserSendSecretWordAction,
    userExit
} from '../actions/userActions'


import './App.css';

function App() {
    const state = useSelector( state => state)
    const dispatch = useDispatch()

    const submitAuth = (userData)=>{
        dispatch(asyncUserAuthAction(userData))
    }
    const submitReg = (userData)=>{
        dispatch(asyncUserRegisterAction(userData))
    }
    const submitSecretWord = (userData)=>{
        dispatch(asyncUserSendSecretWordAction(userData))
    }

    const closeUser = ()=>{
        dispatch(userExit())
    }

    const {height} = useWindowSize()

    return (
        <BrowserRouter>
            <div className="App" style={{height: height}}>
                <Routes>
                    <Route path='/' 
                        element={ state.isSecretGet ? 
                            <IntroPage 
                                user={JSON.parse(localStorage.getItem('user'))}
                                onClickHandler={closeUser}

                            /> 
                            : 
                            <Navigate to="/authorization"/> 
                        } 
                    />

                    <Route path='/authorization' 
                        element={ state.isLoggedIn ? 
                            <Navigate to="/secret"/> 
                            : 
                            <AuthForm onSubmitHandler={submitAuth} /> 
                        } 
                    />
                    <Route path='/registration' 
                        element={ state.isUserCreateAccount ? 
                            <Navigate to="/authorization"/> 
                            :  
                            <RegForm onSubmitHandler={submitReg} /> 
                        } 
                    />
                    <Route path='/secret' 
                        element={ (state.isSecretGet) ? 
                            <Navigate to="/"/> 
                            : 
                            (state.isLoggedIn ? <SecretWordForm onSubmitHandler={submitSecretWord} /> : <Navigate to="/"/>) 
                        } 
                    />
                    <Route path='*' 
                        element={
                            <Navigate to="/"/>
                        }
                    />
                </Routes>

                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar ={true}
                    newestOnTop={false}
                    closeOnClick ={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </BrowserRouter>
    );
}

export default App;
