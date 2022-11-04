import { Children, cloneElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import * as Authorization from '../redux/reducers/authorization';
import MyDialog from './MyDialog';

function RequireAuth({ children }) {
  const store = useSelector((state) => state.authorization);
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    navigate('/login');
  };

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
