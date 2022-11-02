import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as authAction from '../redux/asyncActions/auth';
import * as authReducersAction from '../redux/reducers/auth';
import * as Validation from '../helpers/validation';
import MyButton from '../components/buttons/MyButton';
import MyDialog from '../components/MyDialog';

function Login() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitAction = async (val) => {
    dispatch(authAction.login(val));
  };

  const toRegister = () => {
    navigate('/register');
  };

  useEffect(() => {
    if (store.status === `${authAction.loginActionType}/fulfilled`) {
      localStorage.setItem('token', store.data.access_token);
      dispatch(authReducersAction.handleReset());
      navigate('/');
    }
  }, [store.status]);

  return (
    <>
      <div className="heading">Login</div>
      <div>
        <LoginForm onSubmit={submitAction} status={store.status} />
      </div>
      <button type="button" onClick={toRegister}>Register</button>
      <Link to="/forgot-password">forgot password</Link>
      <MyDialog open={store.status === `${authAction.loginActionType}/rejected`} title="Login Gagal" desc={store.error?.message} handleToClose={() => { dispatch(); }} />
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
