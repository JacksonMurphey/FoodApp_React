import classes from './MealItem.module.css'
import MealForm from './MealForm'
import CartContext from '../../../store/cart-context'
import { useContext } from 'react'


const MealItem = (props) => {

    const { name, description, price, id } = props
    const context = useContext(CartContext)


    const fPrice = `$${price.toFixed(2)}`

    const onAddToCartHandler = amount => {
        context.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price
        })
    }

    return (
        <li className={classes.meal} key={id}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{fPrice}</div>
            </div>
            <div>
                <MealForm id={id} onAddToCart={onAddToCartHandler} />
            </div>
        </li>
    )
}
export default MealItem