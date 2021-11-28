import FormComponent from "../FormComponent/FormComponent"

const SecretWordForm = ({onSubmitHandler})=>{
    return (
        <>
        <FormComponent
            isName = {true}
            isDescription = {true}

            formName = 'Секретная фраза'
            buttonName = 'Проверить'

            onSubmitHandler={onSubmitHandler}
        />
        
        </>
    )
}

export default SecretWordForm