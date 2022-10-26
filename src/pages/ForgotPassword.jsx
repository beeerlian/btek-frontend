import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authRepo from '../repositories/auth.repo';
import BackButton from '../components/buttons/BackButton';

function ForgotPassword() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    message: '',
    status: 'INITIAL',
  });

  const forgotPassword = async (e) => {
    console.log(state);
    e.preventDefault();
    try {
      setState({
        message: '',
        status: 'LOADING',
      });
      const form = {
        email: e.target.email.value,
      };
      const encoded = new URLSearchParams(form);
      const res = await authRepo.forgotPassword(encoded.toString());
      window.localStorage.setItem('token', res.data.access_token);
      navigate('/');
    } catch (error) {
      setState({
        message: error.message || error.data.message,
        status: 'ERROR',
      });
    }
  };

  return (
    <div className="forgot-password">
      <div>Forgot Password</div>
      <form onSubmit={forgotPassword}>
        <input type="email" name="email" />
        <br />
        <button type="submit">Forgot Password</button>
      </form>
      <button
        type="button"
        onClick={() => {
          navigate('/reset-password', { replace: true });
        }}
      >
        Reset Password
      </button>
      <BackButton />
    </div>
  );
}

export default ForgotPassword;
