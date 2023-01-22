import { useNavigate } from 'react-router-dom';

export const userCheck = (user) => {
  const navigate = useNavigate();
  if (user) {
    navigate('/');
    window.location.reload();
  }
};
