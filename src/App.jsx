import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import authService from './services/auth.service';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePrivate from './pages/HomePrivate';
import ErrorPage from './pages/Error404';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';

function App() {
  const { currentUser, setCurrentUser } = useAuth();

  console.log('currentUser', currentUser);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, [setCurrentUser]);

  const logOut = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<HomePrivate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
