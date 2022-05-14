import React, { useContext, useState } from 'react'
import classes from './Cart.module.css'

//--Component Imports--
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
import useHttp from '../hooks/use-http'

const Cart = (props) => {

    //--Props Received from App-Component--
    const { onShowCartHandler } = props

    //--Use Hooks--
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const context = useContext(CartContext)
    const httpData = useHttp()

    //--Destructuring from useHttp and creating alius--
    const { sendRequest: sendMealOrder } = httpData

    //--Variables: Formatting Total-Amount, Boolean to check for Items--
    const totalAmount = `$${context.totalAmount.toFixed(2)}`
    const hasItems = context.items.length > 0

    //--Context/Reducer Functions--
    const removeCartItem = (id) => { context.removeItem(id) }
    const addCartItem = (item) => { context.addItem({ ...item, amount: 1 }) }

    //--Variable For Items In Cart--
    const cartItems =
        <ul className={classes['cart-items']}>
            {context.items.map(item =>
                <CartItem key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={removeCartItem.bind(null, item.id)}
                    onAdd={addCartItem.bind(null, item)}
                />)}
        </ul>


    //--Controlling Conditional Styling--
    const orderViewHandler = () => {
        setIsCheckout(true)
    }

    //-- Posting Data to Firebase DB--
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        sendMealOrder({
            url: 'https://react-http-b49ca-default-rtdb.firebaseio.com/orders.json',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: { user: userData, orderedItems: context.items }
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        context.clearCart()
    }



    //--CONDITIONAL MODAL CONTENT--

    //-->Show Buttons condition
    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onShowCartHandler}>Close</button>
            {hasItems ? <button className={classes.button} onClick={orderViewHandler}>Order</button> : null}
        </div>
    )

    //-->Before Submitting
    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={onShowCartHandler} onConfirm={submitOrderHandler} />}
            {!isCheckout && modalActions}
        </React.Fragment>)

    //-->If Submitting: Processing submitOrderHandler
    const isSubmittingModalContent = <p>Processing Order Request...</p>

    //-->Did Submit: submitOrderHandler Success
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Order Success! Thank you for your order.</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={onShowCartHandler}>Close</button>
            </div>
        </React.Fragment>)




    return (
        <Modal onClose={onShowCartHandler}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}
export default Cart