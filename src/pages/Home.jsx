import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="heading">Wellcome</div>
      <button type="button" onClick={() => { navigate('/character'); }}>Lets Go</button>
    </>
  );
}

export default Home;
