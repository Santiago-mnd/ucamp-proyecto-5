import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-full"
      id="error-page"
    >
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p className="text-2xl my-2">
        Lo siento, ha ocurrido un error.
      </p>
      <p className="text-xl font-bold">
        <i>Página no encontrada.</i>
      </p>
      <Link
        className="bg-red-400 text-white px-4 py-2 rounded-md mt-4"
        to="/"
      >
        Regesa a la página de inicio!
      </Link>
    </div>
  );
};

export default ErrorPage;
