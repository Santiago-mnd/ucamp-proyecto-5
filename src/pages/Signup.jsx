import { useNavigate } from 'react-router-dom';

import authService from '../services/auth.service';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { signup, handleChangeSignup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      authService
        .signup(
          signup.username,
          signup.email,
          signup.password
        )
        .then(
          (response) => {
            console.log(response);
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
          Registrarse
        </h2>
        <input
          type="username"
          name="username"
          placeholder="Username"
          className="w-80 h-10 rounded-lg mb-4 p-2  "
          onChange={(e) => handleChangeSignup(e)}
          value={signup.username}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-80 h-10 rounded-lg mb-4 p-2  "
          onChange={(e) => handleChangeSignup(e)}
          value={signup.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-80 h-10 rounded-lg mb-4 p-2  "
          onChange={(e) => handleChangeSignup(e)}
          value={signup.password}
        />
        <button
          type="submit"
          className="w-80 h-10 rounded-lg bg-blue-400 text-white disabled:opacity-50 disabled:cursor-not-allowed "
          disabled={
            !signup.username ||
            !signup.email ||
            !signup.password
          }
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
