import CartContext from "./cart-context"
import { useReducer } from "react"


const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.payload.id
        ) //built in method in JS, finds the index of an item in an array. take in a Function


        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.payload)//concat returns a new array
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload) //payload is sending an id.

        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price

        let updatedItems
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.payload)
        }
        else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === "CLEAR") {
        return defaultCartState
    }

    return defaultCartState
}




const CartProvider = props => {

    const [cartState, dispatch] = useReducer(cartReducer, defaultCartState)

    const addItemHandler = item => {
        dispatch({ type: 'ADD', payload: item }) //payload could be named anything. 
    }

    const removeItemHandler = id => {
        dispatch({ type: 'REMOVE', payload: id })
    }

    const clearCartHandler = () => {
        dispatch({ type: "CLEAR" })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    }



    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}
export default CartProvider