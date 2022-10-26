import { useNavigate } from 'react-router-dom';

function BackButton({ children, replace }) {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => { navigate(-1, { replace }); }}>
      {children ?? 'Back'}
    </button>
  );
}

export default BackButton;
