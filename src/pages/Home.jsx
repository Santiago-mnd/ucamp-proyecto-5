import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import postService from '../services/post.service';

const Home = () => {
  const [products, setProducts] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    postService.getAllPublicProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="bg-red-400 h-screen w-full overflow-y-scroll text-white flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-6xl mb-6 font-bold text-center">
          E-xclusive
        </h2>
        <div className="flex justify-evenly items-center w-full mx-auto flex-wrap gap-4 md:w-1/2 md:flex-nowrap ">
          {products.length !== 0 ? (
            products.map((product) => (
              <img
                width="200"
                height="200"
                className="object-cover w-24 h-24 rounded-md shadow-2xl md:w-96 md:h-96 "
                src={product.image}
                alt={product.name}
                key={product._id}
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="text-4xl text-center font-bold my-6">
            La única forma de ver los productos es después
            de iniciar sesión.
          </p>
          {currentUser ? (
            <div className="flex items-center justify-center">
              <Link
                to="/private"
                className="rounded-md bg-white text-red-400 px-4 py-2 font-bold "
              >
                Ir a los productos.
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/signup"
                className="rounded-md bg-white text-red-400 px-4 py-2 font-bold "
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="rounded-md bg-red-400 border-2 border-white px-4 py-2 font-bold "
              >
                Iniciar sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
