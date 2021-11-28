
import FormComponent from "../FormComponent/FormComponent"



const AuthForm = ({onSubmitHandler})=>{
    return (
        <>
        <FormComponent
            isEmail = {true}
            isPassword = {true}

            formName = 'Авторизация'
            buttonName = 'Войти'

            onSubmitHandler={onSubmitHandler}
            link = "/registration"
            answerText = 'Еще не зарегистрировались?'
            linkText = 'Зарегистрироваться'

        />
        
        </>
    )
}

export default AuthForm