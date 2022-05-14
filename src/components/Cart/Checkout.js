import { useRef, useState } from 'react'
import classes from './Checkout.module.css'


//--Helper Functions--
const isEmptyInput = value => value.trim() === ''
const isValidPostalLength = value => value.trim().length === 5



const Checkout = (props) => {

    //--Props Received from Cart-Component--
    const { onCancel, onConfirm } = props

    //--State Hook--
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    })

    //--Input References--
    const nameRef = useRef()
    const streetRef = useRef()
    const postalRef = useRef()
    const cityRef = useRef()


    //--Handling Form Submission--
    const confirmHandler = (e) => {
        e.preventDefault()
        //--Variable Holding Input Values--
        const inputName = nameRef.current.value
        const inputStreet = streetRef.current.value
        const inputPostal = postalRef.current.value
        const inputCity = cityRef.current.value
        //--Input Value Validation Checks--
        const nameIsValid = !isEmptyInput(inputName)
        const streetIsValid = !isEmptyInput(inputStreet)
        const cityIsValid = !isEmptyInput(inputCity)
        const postalIsValid = isValidPostalLength(inputPostal)
        //--Updating State Object with Validation Check Returns--
        setFormInputsValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postal: postalIsValid
        })
        //--Complete Form Validation Check--
        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid

        //--Exit Function If not Valid--
        if (!formIsValid) {
            return
        }

        //--Function From Cart Component to POST data to DB--
        onConfirm({
            name: inputName,
            street: inputStreet,
            city: inputCity,
            postal: inputPostal
        })
    }

    //--Valid/Invalid Styling: Inputs/Labels/Errors--
    const nameControlStyle = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
    const streetControlStyle = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
    const postalControlStyle = `${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`
    const cityControlStyle = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`


    return (
        <form onSubmit={confirmHandler}>
            <div className={nameControlStyle}>
                <label htmlFor="">Name</label>
                <input type="text" name="" id="name" ref={nameRef} />
                {!formInputsValidity.name && <span> -Please enter a valid name</span>}
            </div>
            <div className={streetControlStyle}>
                <label htmlFor="">Street</label>
                <input type="text" name="" id="street" ref={streetRef} />
                {!formInputsValidity.street && <span> -Please enter a valid street</span>}
            </div>
            <div className={postalControlStyle}>
                <label htmlFor="">Postal Code</label>
                <input type="text" name="" id="postal" ref={postalRef} />
                {!formInputsValidity.postal && <span> -Please enter a valid postal code</span>}
            </div>
            <div className={cityControlStyle}>
                <label htmlFor="">City</label>
                <input type="text" name="" id="city" ref={cityRef} />
                {!formInputsValidity.city && <span> -Please enter a valid city</span>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout