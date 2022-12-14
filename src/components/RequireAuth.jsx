import { Children, cloneElement } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import * as Authorization from '../redux/reducers/authorization';
import MyDialog from './MyDialog';

function RequireAuth({ children }) {
  const store = useSelector((state) => state.authorization);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleCloseDialog = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <MyDialog
        open={!store?.token}
        title="Opps"
        desc="Your token was expired, please login again"
        buttonText="Oke"
        handleToClose={handleCloseDialog}
      />
      {store?.token ? Children.map(
        children,
        (child) => cloneElement(child, { token: store?.token }, null),
      ) : null}
    </div>
  );
}

export default RequireAuth;
