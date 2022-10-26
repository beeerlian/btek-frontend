/* eslint-disable no-nested-ternary */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Validation from '../helpers/validation';
import MyButton from '../components/buttons/MyButton';
import BackButton from '../components/buttons/BackButton';
import MyDialog from '../components/MyDialog';

import auth from '../repositories/auth.repo';

function ResetPassword() {
  const [state, setState] = useState({
    message: null,
    status: 'INITIAL',
  });
  const navigate = useNavigate();

  const submitAction = async ({
    email, code, newPassword, confirmPassword,
  }) => {
    setState({ status: 'LOADING' });
    try {
      const form = {
        email,
        code,
        newPassword,
        confirmPassword,
      };
      const encoded = new URLSearchParams(form);
      const res = await auth.resetPassword(encoded.toString());
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
      navigate('/login', { replace: true });
    } else if (state.status === 'ERROR') {
      setState({ status: 'INITIAL' });
    }
  };

  return (
    <>
      <div className="heading">Reset Password</div>
      <div>
        <LoginForm onSubmit={submitAction} status={state.status} />
      </div>
      <BackButton replace>Cancel</BackButton>
      <MyDialog
        open={state.status === 'ERROR' || state.status === 'SUCCESS'}
        title={state.status === 'ERROR' ? 'Opps' : state.status === 'SUCCESS' ? 'Success' : ''}
        desc={state.message}
        handleToClose={handleCloseDialog}
      />
    </>
  );
}

function LoginForm({ onSubmit, status }) {
  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: '',
        email: '',
        code: '',
      }}
      validationSchema={Validation.default.ResetPassSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          {errors.email && touched.email ? <div className="form-error-msg">{errors.email}</div> : null}
          <br />
          <Field name="code" type="number" placeholder="Code" />
          {errors.code && touched.code ? (<div className="form-error-msg">{errors.code}</div>) : null}
          <br />
          <Field name="newPassword" type="password" placeholder="New Password" />
          {errors.newPassword && touched.newPassword ? (<div className="form-error-msg">{errors.newPassword}</div>) : null}
          <br />
          <Field name="confirmPassword" type="password" placeholder="Confirm Password" />
          {errors.confirmPassword && touched.confirmPassword ? (<div className="form-error-msg">{errors.confirmPassword}</div>) : null}
          <br />
          <MyButton type="submit" isLoading={status === 'LOADING'}>Reset Password</MyButton>
        </Form>
      )}
    </Formik>
  );
}

export default ResetPassword;
