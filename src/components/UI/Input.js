import classes from './Input.module.css'
import React from 'react'

const Input = React.forwardRef((props, ref) => {

    //Below I am using the spread operator {...input}. this works because I plan to pass and object thru that will contain the necessary info, such as {type: 'text'}
    //This allows the input to be highly configurable from outside this component.

    const { label, input } = props

    return (
        <div className={classes.input}>
            <label htmlFor={input.id}>{label}</label>
            <input {...input} ref={ref} />
        </div>
    )
})
export default Input