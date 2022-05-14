import { useState } from 'react'
import Header from './components/Format/Header';
import Meals from './components/Food/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {

  const [cartIsOpen, setCartIsOpen] = useState(false)

  const showCartHandler = () => {
    setCartIsOpen(!cartIsOpen)
  }

  return (
    <CartProvider >
      {cartIsOpen ? <Cart onShowCartHandler={showCartHandler} /> : null}
      <Header onShowCartHandler={showCartHandler} />
      <main >
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
