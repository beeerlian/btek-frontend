import { useNavigate } from 'react-router-dom';
import CenteredCard from '../components/card/CenteredCard';
import Button from '../components/buttons/Button';

function Home() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('./login', { replace: true });
  };
  return (
    <CenteredCard>
      <div>
        <div className="card-title mb-6">Wellcome</div>
        <Button type="button" onClick={logout}>Logout</Button>
        <Button type="button" onClick={() => { navigate('/profile'); }}>Profile</Button>
      </div>
    </CenteredCard>
  );
}

export default Home;
