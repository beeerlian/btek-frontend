import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const location = useLocation();
  const token = window.localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" state={location} />;
  }
  return children;
}

export default RequireAuth;