import FormComponent from "../FormComponent/FormComponent"


const RegForm = ({onSubmitHandler})=>{
    return (
        <FormComponent
            isName = {true}
            isLastName = {true}
            isEmail = {true}
            isPhone = {true}
            isPassword = {true}

            formName = 'Регистрация'
            buttonName = 'Зарегистрироваться'

            onSubmitHandler={onSubmitHandler}
            link = "/authorization"
            answerText = 'Уже есть аккаунт? '
            linkText = 'Войти'
        />
    )
}

export default RegForm