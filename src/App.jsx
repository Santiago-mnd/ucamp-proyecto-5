import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import authService from './services/auth.service';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePrivate from './pages/HomePrivate';
import ErrorPage from './pages/Error404';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, [setCurrentUser]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<HomePrivate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
