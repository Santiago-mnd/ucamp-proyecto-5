import { useEffect, useState } from 'react';
import {
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ErrorPage from './Error404';

const Profile = () => {
  // get params from url
  const [user, setUser] = useState({});
  const { id } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/users/user-id/${id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, []);

  return (
    <div>
      {user?.username ? (
        <div className="flex flex-col justify-center items-center bg-red-400 w-full h-screen overflow-y-scroll">
          <div className="h-96 w-96 rounded-md bg-white flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">
              Hola! {user.username}
            </h1>
            <p>No hay mucho que hacer por aquí...</p>
            <p>
              Tu ID es:{' '}
              <span className="font-bold"> {id}</span>
            </p>
            <p>
              Tu correo es:{' '}
              <span className="font-bold">
                {user.email}
              </span>
            </p>
            <Link
              to="/private"
              className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
            >
              Ir a Home
            </Link>
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

export default Profile;
