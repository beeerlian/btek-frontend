/* eslint-disable no-nested-ternary */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import authRepo from '../repositories/auth.repo';
import * as Validation from '../helpers/validation';
import BackButton from '../components/buttons/BackButton';
import MyButton from '../components/buttons/MyButton';
import MyDialog from '../components/MyDialog';

function ForgotPassword() {
  const navigate = useNavigate();
  const [state, setState] = useState({ message: '', status: 'INITIAL' });

  const forgotPassword = async ({ email }) => {
    try {
      setState({ message: '', status: 'LOADING' });
      const form = { email };
      const encoded = new URLSearchParams(form);
      const res = await authRepo.forgotPassword(encoded.toString());
      setState({
        message: res.data.message,
        status: 'SUCCESS',
      });
    } catch (error) {
      setState({
        message: error.response.data.message || toString(error),
        status: 'ERROR',
      });
    }
  };

  const handleCloseDialog = () => {
    if (state.status === 'SUCCESS') {
      navigate('/reset-password');
    } else if (state.status === 'ERROR') {
      setState({ status: 'INITIAL' });
    }
  };

  return (
    <div className="forgot-password">
      <div>Forgot Password</div>
      <ForgotPasswordForm onSubmit={forgotPassword} status={state.status} />
      <button
        type="button"
        onClick={() => {
          navigate('/reset-password', { replace: true });
        }}
      >
        Reset Password
      </button>
      <BackButton />
      <MyDialog
        open={state.status === 'ERROR' || state.status === 'SUCCESS'}
        title={state.status === 'ERROR' ? 'Opps' : state.status === 'SUCCESS' ? 'Success' : ''}
        desc={state.message}
        handleToClose={handleCloseDialog}
      />
    </div>
  );
}

function ForgotPasswordForm({ onSubmit, status }) {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Validation.default.EmailSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="email" type="email" />
          {errors.email && touched.email ? <div className="form-error-msg">{errors.email}</div> : null}
          <br />
          <MyButton type="submit" isLoading={status === 'LOADING'}>Send</MyButton>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPassword;
