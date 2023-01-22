import useCheckout from '../hooks/useCheckout';
import { PPButton } from '../components/PayPalButton';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ErrorMessage from '../components/ErrorMessage';

const Checkout = () => {
  const { cart, setCart } = useCheckout();

  return (
    <div className="bg-red-400 w-full h-screen overflow-y-scroll ">
      {cart.length > 0 ? (
        <div>
          <div className="flex flex-col justify-between items-center w-1/2 mx-auto md:flex-row">
            <h2 className="text-3xl font-bold text-center py-4">
              Checkout
            </h2>
            <Link
              to={'/private'}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Volver a la tienda
            </Link>
          </div>
          {cart.map((product) => (
            <div
              key={product.name}
              className="flex flex-col items-center justify-center mx-auto my-4 bg-white p-4 rounded-md shadow-2xl md:w-3/4 "
            >
              <img
                className="w-64 h-64 object-cover"
                src={product.image}
                alt={product.name}
              />
              <h3 className="text-2xl font-bold">
                {product.name}
              </h3>
              <p className="text-xl font-bold">
                ${product.price}
              </p>
              <p className="text-xl font-bold">
                {product.description}
              </p>
              <p className="text-xl font-bold">
                {product.category}
              </p>
              <p className="text-xl font-bold">
                Cantidad: {product.quantity}
              </p>
              <div className="flex items-center justify-center w-full gap-2">
                <button className="bg-red-400 p-2 rounded-md font-bold text-white mt-2 ">
                  Añadir al carro
                </button>
                <Link
                  className="bg-red-400 p-2 rounded-md font-bold text-white mt-2 "
                  to="/private"
                >
                  Volver a la tienda
                </Link>
              </div>
            </div>
          ))}
          <div className="mt-4 flex flex-col justify-center items-center gap-4 ">
            <div>
              <p className="font-bold text-2xl md:text-4xl">
                TOTAL: $
                {cart
                  .map(
                    ({ price, quantity }) =>
                      price * quantity
                  )
                  .reduce((a, b) => a + b, 0)}
              </p>
            </div>
            <PPButton
              currency={'USD'}
              showSpinner={false}
            />
            <button
              onClick={() => setCart([])}
              className="p-2 bg-white text-red-400 mx-auto rounded-md "
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      ) : (
        <div className=" h-screen flex justify-center items-center">
          <div className="bg-white h-96 w-96 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p>Nada por aquí.</p>
            <Link
              to={'/private'}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
