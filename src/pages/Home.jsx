import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('./login', { replace: true });
  };
  return (
    <>
      <div className="heading">Wellcome</div>
      <button type="button" onClick={logout}>Logout</button>
      <button type="button" onClick={() => { navigate('/profile'); }}>Profile</button>
    </>
  );
}

export default Home;
