import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Validation from '../helpers/validation';

import auth from '../repositories/auth.repo';

function Login() {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const submitAction = async ({ email, password }) => {
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
      setErr(err.message);
    }
  };

  const toRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="heading">Login</div>
      {err ? <p>err</p> : null}
      <div>
        <LoginForm onSubmit={submitAction} />
      </div>
      <button type="button" onClick={toRegister}>Register</button>
      <Link to="/forgot-password">forgot password</Link>

    </>
  );
}

function LoginForm({ onSubmit }) {
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
          <Field name="email" type="email" />
          {errors.email && touched.email ? <div className="form-error-msg">{errors.email}</div> : null}
          <br />
          <Field name="password" />
          {errors.password && touched.password ? (
            <div className="form-error-msg">{errors.password}</div>
          ) : null}
          <br />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
