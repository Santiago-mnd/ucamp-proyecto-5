import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [signup, setSignup] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChangeSignup = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLogin = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        handleChangeSignup,
        signup,
        handleChangeLogin,
        login,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
