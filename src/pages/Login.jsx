import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Validation from '../helpers/validation';
import MyButton from '../components/buttons/MyButton';
import MyDialog from '../components/MyDialog';

import auth from '../repositories/auth.repo';

function Login() {
  const [state, setState] = useState({ status: 'INITIAL' });
  const navigate = useNavigate();

  const submitAction = async ({ email, password }) => {
    setState({ status: 'LOADING' });
    try {
      const form = {
        email,
        password,
      };
      const encoded = new URLSearchParams(form);
      const res = await auth.login(encoded.toString());
      window.localStorage.setItem('token', res.data.access_token);
      navigate('/');
    } catch (error) {
      setState({
        errMsg: error.response.data.message,
        status: 'ERROR',
      });
    }
  };

  const toRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="heading">Login</div>
      <div>
        <LoginForm onSubmit={submitAction} status={state.status} />
      </div>
      <button type="button" onClick={toRegister}>Register</button>
      <Link to="/forgot-password">forgot password</Link>
      <MyDialog open={state.status === 'ERROR'} title="Login Gagal" desc={state.errMsg} handleToClose={() => { setState({ status: 'INITIAL' }); }} />
    </>
  );
}

function LoginForm({ onSubmit, status }) {
  return (
    <Formik
      initialValues={{
        password: '',
        email: '',
      }}
      validationSchema={Validation.default.EmailPassSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          {errors.email && touched.email ? <div className="form-error-msg">{errors.email}</div> : null}
          <br />
          <Field name="password" type="password" placeholder="Password" />
          {errors.password && touched.password ? (
            <div className="form-error-msg">{errors.password}</div>
          ) : null}
          <br />
          <MyButton type="submit" isLoading={status === 'LOADING'}>Login</MyButton>

        </Form>
      )}
    </Formik>
  );
}

export default Login;
