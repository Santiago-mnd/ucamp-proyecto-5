import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import authService from '../services/auth.service';
import useAuth from '../hooks/useAuth';
import { userCheck } from '../utils/userCheck';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
  const [error, setError] = useState('');
  const { login, handleChangeLogin, currentUser } =
    useAuth();
  const navigate = useNavigate();

  userCheck(currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      authService.login(login.email, login.password).then(
        () => {
          navigate('/');
          window.location.reload();
        },
        (error) => {
          setError(error.response.data.message);
        }
      );
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-400 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-96 h-96 bg-gray-200 rounded-lg shadow-2xl "
      >
        {error && <ErrorMessage error={error} />}
        <h2 className="text-4xl font-bold my-4">
          Iniciar sesión
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-80 h-10 rounded-lg mb-4 p-2  "
          onChange={(e) => handleChangeLogin(e)}
          value={login.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-80 h-10 rounded-lg mb-4 p-2  "
          onChange={(e) => handleChangeLogin(e)}
          value={login.password}
        />
        <button
          type="submit"
          className="w-80 h-10 rounded-lg bg-blue-400 font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed "
          disabled={!login.email || !login.password}
        >
          Iniciar sesión
        </button>
        <div className="mt-3 flex flex-col">
          <Link
            to="/signup"
            className="w-80 h-10 rounded-lg bg-blue-400 font-bold text-white my-2 flex items-center justify-center"
          >
            Registrarse
          </Link>
          <Link
            to="/"
            className="w-80 h-10 rounded-lg bg-blue-400 font-bold text-white my-2 flex items-center justify-center "
          >
            Volver a la página principal
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
