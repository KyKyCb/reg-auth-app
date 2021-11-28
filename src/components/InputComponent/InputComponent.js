import './InputComponent.css'
const InputComponent = ({type, name, value, labelName, onChangeHandler})=>{
    const onChange = (event)=>{
        onChangeHandler(event.target.value)
    }
    return(
        <label className="input__label">
            <span className='input__label-text'>{labelName}</span>
            <input 
                type={type} 
                name={name}
                onChange={onChange}
                value={value}
            />
        </label>
    )
}

export default InputComponent