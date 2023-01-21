import useCheckout from '../hooks/useCheckout';

const Checkout = () => {
  const { cart, setCart } = useCheckout();

  console.log('cart', cart);

  return (
    <>
      {cart.length > 0 ? (
        <div>
          <h1>Checkout</h1>
          <p>Cart: {cart.length}</p>
        </div>
      ) : (
        <div>
          <h1>Checkout</h1>
          <p>Cart: {cart.length}</p>
          <p>Cart is empty</p>
        </div>
      )}
    </>
  );
};

export default Checkout;
