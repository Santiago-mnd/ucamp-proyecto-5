import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorPage from './Error404';
import useCheckout from '../hooks/useCheckout';
import useAuth from '../hooks/useAuth';

const Product = () => {
  const [product, setProduct] = useState({});
  const { addToCart } = useCheckout();
  const { currentUser } = useAuth();

  const { price } = useParams();

  useEffect(() => {
    if (currentUser) {
      fetch(
        `${import.meta.env.VITE_API_URL}/private/${price}`
      )
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        });
    }
  }, [price]);

  return (
    <>
      {product?.name ? (
        <div
          key={product.name}
          className="flex flex-col h-screen justify-center bg-red-400"
        >
          <div className="flex flex-col items-center justify-center mx-auto my-4 bg-white p-4 rounded-md shadow-2xl md:w-3/4 ">
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
            <div className="flex items-center justify-center w-full gap-2">
              <button
                onClick={() => addToCart(product)}
                className="bg-red-400 p-2 rounded-md font-bold text-white mt-2 "
              >
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
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default Product;
