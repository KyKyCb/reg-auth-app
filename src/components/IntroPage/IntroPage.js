import {ReactComponent as Logo} from '../../assets/logo.svg'
import {ReactComponent as Arrow} from '../../assets/icons/fi_chevron-left.svg'


import './IntroPage.css'

const IntroPage = ({user, onClickHandler})=>{
    return (
        <div className="intro-page__container">

            <div className="intro-page__content-positioner_from-top"/>

            <div className = "intro-page__content">

                <Logo className="intro-page__logo"/>
                <h1 className="intro-page__user-greetings">
                    {user.name}, thanks for registration
                </h1>

                <p className="intro-page__user-info">
                    <span className="intro-page__user-info color-green">Check your email </span>
                    and confirm please registration
                </p>
                
                <div className="intro-page__button" onClick={onClickHandler}>
                    <Arrow/>
                    <span className="intro-page__button-text">Back to home</span>
                    
                </div>

            </div>

        </div>
    )
}

export default IntroPage