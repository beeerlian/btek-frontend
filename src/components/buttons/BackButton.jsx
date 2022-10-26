import { useNavigate } from 'react-router-dom';

function BackButton({ title }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        navigate(-1);
      }}
    >
      {title ?? 'Back'}

    </button>
  );
}

export default BackButton;
