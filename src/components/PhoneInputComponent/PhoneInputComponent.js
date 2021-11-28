import PhoneInput from 'react-phone-number-input'
import countryNames from 'react-phone-number-input/locale/en.json'

import 'react-phone-number-input/style.css'


const PhoneInputComponent = ({value, country, onChangePhoneHandler, onChangeCountryHandler, labelName})=>{
    const countryChangeHandler = (unicode) =>{
        console.log(unicode)
        const country = {
            unicode: unicode,
            countryName: countryNames[unicode]
        }
        onChangeCountryHandler(country)
    }
    return (
        <label className='input__label'>
        
            <span className='input__label-text'>{labelName}</span>
            <PhoneInput
                international
                countryCallingCodeEditable={false}

                value={value}
                onChange={onChangePhoneHandler}
                limitMaxLength = {true}
                
                defaultCountry = {country.unicode}
                onCountryChange = {countryChangeHandler}
            />
        </label>
    )
}

export default PhoneInputComponent