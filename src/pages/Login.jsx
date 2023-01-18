import { useNavigate } from 'react-router-dom';

import authService from '../services/auth.service';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login, handleChangeLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      authService.login(login.email, login.password).then(
        () => {
          navigate('/');
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red-400 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-96 h-96 bg-gray-200 rounded-lg shadow-2xl "
      >
        <h2 className="text-4xl font-bold mb-4">
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
          className="w-80 h-10 rounded-lg bg-blue-400 text-white disabled:opacity-50 disabled:cursor-not-allowed "
          disabled={!login.email || !login.password}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
