import classes from './Header.module.css'
import { Fragment } from 'react'
import { default as logo } from '../../assets/streetFood.svg'

import CartButton from './CartButton'

const Header = (props) => {

    //--Props Received from App-Component--
    const { onShowCartHandler } = props

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Nuff~Food</h1>
                <CartButton onClick={onShowCartHandler} />
            </header>
            <div className={classes['main-image']}>
                <img src={logo} alt="Street Food" />
            </div>
        </Fragment>
    )
}
export default Header