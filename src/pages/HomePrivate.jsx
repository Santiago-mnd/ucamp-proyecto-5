import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import postService from '../services/post.service';
import authService from '../services/auth.service';
import NoAccess from '../components/NoAccess';
import { PPButton } from '../components/PayPalButton';

const HomePrivate = () => {
  const [privateProducts, setPrivateProducts] = useState(
    []
  );
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
  }, []);

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
            <h1>Home Private</h1>
            {currentUser && (
              <div>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </header>
          <div className="flex justify-center items-center h-screen bg-red-400 ">
            <div className="flex flex-col justify-center items-center w-96 h-96 bg-gray-200 rounded-lg shadow-2xl ">
              <h2 className="text-4xl font-bold mb-4">
                Home Private
              </h2>

              <PPButton
                currency={'USD'}
                showSpinner={false}
              />
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
