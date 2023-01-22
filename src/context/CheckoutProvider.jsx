import { createContext, useState } from 'react';

const CheckoutContext = createContext();

const CheckoutProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    !product.quantity && (product.quantity = 1);

    const isProductInCart = cart.find(
      (item) => item.name === product.name
    );
    if (isProductInCart) {
      const newCart = cart.map((item) => {
        if (item.name === product.name) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCart(newCart);
      return;
    }

    setCart([...cart, product]);
  };

  return (
    <CheckoutContext.Provider
      value={{ cart, setCart, addToCart }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutProvider };

export default CheckoutContext;
