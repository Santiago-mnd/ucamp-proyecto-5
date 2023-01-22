import { Link } from 'react-router-dom';

const NoAccess = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-red-400 ">
      <div className="flex flex-col justify-center items-center w-96 h-96 bg-gray-200 rounded-lg shadow-2xl ">
        <h2 className="text-4xl font-bold mb-4 text-center">
          ¡No tienes permiso para estar aquí!
        </h2>
        <Link
          className="bg-blue-400 text-white font-bold text-lg rounded-lg p-2"
          to="/login"
        >
          ¡Inicia sesión!
        </Link>
      </div>
    </div>
  );
};

export default NoAccess;
