
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Button from "../Button/Button"
import InputComponent from "../InputComponent/InputComponent"
import PhoneInputComponent from "../PhoneInputComponent/PhoneInputComponent"


import './FromComponent.css'

function FormComponent ({isName, isLastName, isEmail, isPhone, isPassword, isDescription, formName, buttonName, onSubmitHandler, link, answerText, linkText}){

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState({unicode: 'UA', countryName: 'Ukraine'})
    const [password, setPassword] = useState('')

    const setNameHandler = (newName)=>{
        setName(newName.trim())
    }

    const setLastNameHandler = (newLastName)=>{
        setLastName(newLastName.trim())
    }

    const setDescriptionHandler = (newDesc)=>{
        setDescription(newDesc)
    }

    const setEmailHandler = (newEmail)=>{
        setEmail(newEmail.trim())
    }

    const setPhoneHandler = (newPhone)=>{
        setPhone(newPhone.trim())
    }
    
    const setCountryHandler = (newCountry)=>{
        setCountry(newCountry)
    }

    const setPasswordHandler = (newPassword)=>{
        setPassword(newPassword.trim())
    }

    const validateForm = (objectValidate)=>{
        const args = Object.keys(arguments[0])

        const requireInputs = args.map( arg => {
            return arg.split('is').join('').toLocaleLowerCase()
        })

        const stateKeys = Object.keys(objectValidate).filter(key => {
            if(requireInputs.find(name => name === key.toLocaleLowerCase())){
                return true
            }
            return false
        })

        let checkResult = true
        let stateName = ''

        for(let i = 0; i<stateKeys.length; i++){
            if(!objectValidate[stateKeys[i]].trim()){
                checkResult = false
                stateName = stateKeys[i]

                return {checkResult, stateName}
            }
        }

        return {checkResult, stateName}
    }

    const submitHandler = (event)=>{
        try {
            event.preventDefault()
            const formProps = {name, lastName, description, email, phone, password, country: country.countryName}
            const userData = {}

            const {checkResult, stateName} = validateForm(formProps)

            if(!checkResult){
                throw new Error('Require input not filled. State name: '+stateName)
            }

            Object.keys(formProps).forEach(prop => {
                if(formProps[prop]){
                    if(prop === 'lastName'){
                        userData.lname = formProps[prop]
                        return
                    }
                    if(prop === 'country' && !isPhone){
                        return
                    }
                    userData[prop] = formProps[prop]
                }
            })
            
            onSubmitHandler(userData)
        } catch (error) {
            toast.error('Whoops! Something went wrong')
            console.error(error)
        }
        
    }

    return (
        <div className = 'form__container'>
            <div className="form__content">

                <h2 className="form__form-name">{formName}</h2>

                <form className="form" onSubmit={submitHandler}>

                    {isName === true && 
                        <InputComponent
                            type = 'text'
                            name = 'name'
                            value = {name}
                            labelName = 'Имя'
                            onChangeHandler = {setNameHandler}
                        />
                    }

                    {isLastName === true &&
                        <InputComponent
                            type = 'text'
                            name = 'lname'
                            value = {lastName}
                            labelName = 'Фамилия'
                            onChangeHandler = {setLastNameHandler}
                        />
                    }

                    {isDescription === true &&
                        <InputComponent
                            type = 'text'
                            name = 'description'
                            value = {description}
                            labelName = 'Секретная фраза'
                            onChangeHandler = {setDescriptionHandler}
                        />
                    }

                    {isEmail === true &&
                        <InputComponent
                            type = 'text'
                            name = 'email'
                            value = {email}
                            labelName = 'E-mail'
                            onChangeHandler = {setEmailHandler}
                        />
                    }

                    {isPhone === true &&
                        <PhoneInputComponent
                            value={phone}
                            country = {country}
                            onChangePhoneHandler={setPhoneHandler}
                            onChangeCountryHandler={setCountryHandler}
                            labelName = 'Телефон'
                        />
                    }

                    {isPassword === true &&
                        <InputComponent
                            type = 'password'
                            name = 'password'
                            value = {password}
                            labelName = 'Пароль'
                            onChangeHandler = {setPasswordHandler}
                        />
                    }

                    <Button
                        buttonName = {buttonName}
                    />

                </form>
                {link ? 
                    <span className="form__answer-text">{answerText} {<Link to={link}>{linkText}</Link>}</span>
                    : null
                }
                
            </div>
        </div>
    )
}

export default FormComponent