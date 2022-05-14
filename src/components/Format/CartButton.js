import CartIcon from '../Cart/CartIcon'
import classes from './CartButton.module.css'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'

const CartButton = props => {

    //--Props Received from Header-Component--
    const { onClick } = props

    const [buttonBump, setButtonBump] = useState(false)
    const context = useContext(CartContext)
    const { items } = context //destructuring so that I have access to just my array of items
    //What does .reduce() do: 
    //.reduce() takes two arguments: (callbackFn, startingValue)
    //It works like a map or a loop. If you are reducing an array, it will look and each index in the array, and return you the number of items, or values at that index. This can returned value will now take the place of your starting value, and it will move to the next index and repeat.

    //So in the case of a shopping cart, if you were to add 3 of the same items to the array, then later add 2 more items to the array, This would return 5.

    const numOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)



    const btnClasses = `${classes.button} ${buttonBump ? classes.bump : ''}` //creating a new string literall to pass to my button which contains a ternary which controls my animation class

    //Using useEffect to control when buttonBump will be true. I want the animation to run when my items array changes. That is why I have destructur context to get 'items'
    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setButtonBump(true)

        const timer = setTimeout(() => {
            setButtonBump(false)
        }, 300)//300ms is the duration time of my animation

        return () => {
            clearTimeout(timer)
        }

    }, [items])

    return (
        <button className={btnClasses} onClick={onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numOfCartItems}</span>
        </button>
    )
}
export default CartButton