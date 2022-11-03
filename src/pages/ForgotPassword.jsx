/* eslint-disable no-nested-ternary */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import authRepo from '../repositories/auth.repo';
import * as Validation from '../helpers/validation';
import BackButton from '../components/buttons/BackButton';
import Button from '../components/buttons/Button';
import MyDialog from '../components/MyDialog';
import CenteredCard from '../components/card/CenteredCard';

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
    <CenteredCard>
      <div>
        <div className="card-title">Forgot Password</div>
        <ForgotPasswordForm onSubmit={forgotPassword} status={state.status} />
        <BackButton />
        <MyDialog
          open={state.status === 'ERROR' || state.status === 'SUCCESS'}
          title={state.status === 'ERROR' ? 'Opps' : state.status === 'SUCCESS' ? 'Success' : ''}
          desc={state.message}
          handleToClose={handleCloseDialog}
        />
      </div>
    </CenteredCard>
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
          <Field className="form" name="email" type="email" />
          {errors.email && touched.email ? <div className="form-error-msg">{errors.email}</div> : null}
          <br />
          <Button type="submit" isLoading={status === 'LOADING'}>Send</Button>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPassword;
