import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import postService from '../services/post.service';
import authService from '../services/auth.service';
import NoAccess from '../components/NoAccess';
import { PPButton } from '../components/PayPalButton';
import { getCurrentEmail } from '../utils/getEmail';
import Cart from '../components/icons/Cart';

const HomePrivate = () => {
  const [privateProducts, setPrivateProducts] = useState(
    []
  );

  const [user, setUser] = useState({});

  const email = getCurrentEmail() || '';

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      postService.getAllPrivateProducts().then(
        (response) => {
          setPrivateProducts(response.data);
        },
        (error) => {
          if (error) {
            authService.logout();
            navigate('/login');
            window.location.reload();
          }
        }
      );
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
  }, [email]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
  };

  console.log('currentUser', currentUser);

  return (
    <div className="flex flex-col h-screen">
      {currentUser ? (
        <>
          <header className="justify-self-start w-full flex justify-evenly bg-slate-900 h-12 text-white items-center">
            <h1>Home Private</h1>
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
            <Link to={'/checkout'}>
              <Cart Class="w-6" />
            </Link>
            {currentUser && (
              <div>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </header>
          <div className=" w-full h-screen bg-red-400 ">
            <h2 className="text-4xl font-bold mb-4">
              Home Private
            </h2>
            <PPButton
              currency={'USD'}
              showSpinner={false}
            />
          </div>
        </>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default HomePrivate;
