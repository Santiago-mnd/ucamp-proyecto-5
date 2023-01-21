import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import NoAccess from '../components/NoAccess';

const Profile = () => {
  // get params from url
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/users/user-id/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {user?.username ? (
        <>
          <h1>Profile</h1>
          <p>Profile id: {id} </p>
        </>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default Profile;
