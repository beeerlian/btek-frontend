import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import auth from '../repositories/auth.repo';
import BackButton from '../components/buttons/BackButton';
import * as Validation from '../helpers/validation';
import MyButton from '../components/buttons/MyButton';

function Register() {
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
      const res = await auth.register(encoded.toString());
      window.localStorage.setItem('token', res.data.access_token);
      navigate('/');
    } catch (error) {
      setState({ status: 'ERROR' });
    }
  };
  return (
    <>
      <div className="heading">Register</div>
      <RegisterForm onSubmit={submitAction} status={state.status} />
      <BackButton />
    </>
  );
}

function RegisterForm({ onSubmit, status }) {
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
          <MyButton type="submit" isLoading={status === 'LOADING'}>Register</MyButton>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
