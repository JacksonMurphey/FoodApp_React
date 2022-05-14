import classes from './MealFrom.module.css'
import Input from '../../UI/Input'
import { useRef, useState } from 'react'

const MealForm = (props) => {

    const [amountIsValid, setAmountIsValid] = useState(true)

    const amountRef = useRef()
    const submitHandler = e => {
        e.preventDefault()
        const enteredAmount = amountRef.current.value
        //amountRef.current.value returns a string
        const enteredAmountNum = +enteredAmount
        //+enteredAmount: the plus converts it to an int, could likely also use .parseInt()

        if (enteredAmount.trim() === 0 || enteredAmountNum < 1 || enteredAmountNum > 5) {
            setAmountIsValid(false)
            return
        }
        props.onAddToCart(enteredAmountNum)
    }

    const { id } = props
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountRef}
                label='Amount'
                input={{
                    id: 'amount_' + id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>+ Add</button>
            {!amountIsValid ? <p>Please enter a valid amount</p> : null}
        </form>

    )
}
export default MealForm