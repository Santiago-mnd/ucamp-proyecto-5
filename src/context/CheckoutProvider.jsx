import { createContext, useState } from 'react';

const CheckoutContext = createContext();

const CheckoutProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <CheckoutContext.Provider value={{ cart, setCart }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutProvider };

export default CheckoutContext;
