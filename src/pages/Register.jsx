import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import auth from '../repositories/auth.repo';
import BackButton from '../components/buttons/BackButton';
import * as Validation from '../helpers/validation';

function Register() {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const submitAction = async ({ email, password }) => {
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
      setErr(err.code);
    }
  };
  return (
    <>
      <div className="heading">Register</div>
      {err ? <p>err</p> : null}
      <RegisterForm onSubmit={submitAction} />
      <BackButton />
    </>
  );
}

function RegisterForm({ onSubmit }) {
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

export default Register;
