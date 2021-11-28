import './Button.css'

const Button = ({buttonName, onClickHandler})=>{
    return(
        <div className="button__container">
            <button 
                onClick = {onClickHandler}
                className="button"
            >
                {buttonName}
            </button>
        
        </div>
    )
}

export default Button