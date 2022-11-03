import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import auth from '../repositories/auth.repo';
import BackButton from '../components/buttons/BackButton';
import * as Validation from '../helpers/validation';
import Button from '../components/buttons/Button';
import CenteredCard from '../components/card/CenteredCard';

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
    <CenteredCard>
      <div>
        <div className="card-title">Register</div>
        <RegisterForm className="card-body" onSubmit={submitAction} status={state.status} />
        <div className="card-actions justify-end">
          <BackButton />
        </div>
      </div>
    </CenteredCard>
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
          <Field className="form" name="email" type="email" placeholder="Email" />
          {errors.email && touched.email ? <div className="form-error-msg">{errors.email}</div> : null}
          <br />
          <Field className="form" name="password" type="password" placeholder="Password" />
          {errors.password && touched.password ? (
            <div className="form-error-msg">{errors.password}</div>
          ) : null}
          <br />
          <Button type="submit" isLoading={status === 'LOADING'}>Register</Button>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
