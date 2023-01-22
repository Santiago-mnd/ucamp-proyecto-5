import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import postService from '../services/post.service';
import authService from '../services/auth.service';
import NoAccess from '../components/NoAccess';
import { getCurrentEmail } from '../utils/getEmail';
import Cart from '../components/icons/Cart';
import useCheckout from '../hooks/useCheckout';

const HomePrivate = () => {
  const [privateProducts, setPrivateProducts] = useState(
    []
  );
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { cart, addToCart } = useCheckout();
  const email = getCurrentEmail() || '';

  console.log('cart', cart);
  useEffect(() => {
    if (currentUser) {
      postService
        .getAllPrivateProducts()
        .then((response) => {
          setPrivateProducts(response.data);
        })
        .catch((error) => {
          if (error) {
            authService.logout();
            navigate('/login');
            window.location.reload();
          }
        });
    }

    if (email) {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/users/single-user/${email}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, [currentUser, email]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen">
      {currentUser ? (
        <>
          <header className="justify-self-start w-full flex justify-evenly bg-slate-900 h-12 text-white items-center">
            <h1 className="font-bold hidden md:block ">
              Home Private
            </h1>
            {user.username ? (
              <Link
                className="font-bold text-white text-xl"
                to={`/profile/${user._id}`}
              >
                {user.username}
              </Link>
            ) : (
              <span className="font-bold text-white text-xl">
                No se ha encontrado el usuario.
              </span>
            )}
            <Link to={'/checkout'} className="relative">
              <Cart Class="w-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 -right-2 bg-red-400 rounded-full w-4 h-4 text-white text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            {currentUser && (
              <div>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </header>
          <div className=" w-full bg-red-400 ">
            <h2 className="text-4xl font-bold mb-4 text-center my-2 text-white">
              Elige tus productos!
            </h2>
            <div className="overflow-y-scroll h-10/12 grid grid-cols-1 pb-12 md:grid-cols-2 ">
              {privateProducts.length > 0 ? (
                privateProducts.map((product) => (
                  <div
                    key={product.price}
                    className="flex flex-col items-center justify-center mx-auto my-4 bg-white p-4 rounded-md shadow-2xl hover:shadow-3xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 md:w-3/4 "
                  >
                    <Link
                      to={`product/${product.price}`}
                      className="w-11/12 mx-auto"
                    >
                      <img
                        className="w-64 h-64 object-cover mx-auto"
                        src={product.image}
                        alt={product.name}
                      />
                      <h3 className="text-2xl font-bold">
                        {product.name}
                      </h3>
                      <p className="text-xl font-bold">
                        ${product.price}
                      </p>
                      <p className="text-xl font-bold line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-xl font-bold">
                        {product.category}
                      </p>
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-red-400 p-2 rounded-md font-bold text-white mt-2 "
                    >
                      Add to cart
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay productos</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default HomePrivate;
