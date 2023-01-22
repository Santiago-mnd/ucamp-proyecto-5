const ErrorMessage = ({ error }) => {
  return (
    <p className="w-full bg-red-500 text-white font-bold text-lg text-center py-2">
      {error}
    </p>
  );
};

export default ErrorMessage;
