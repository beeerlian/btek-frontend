import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as authAction from '../redux/asyncActions/auth';
import * as authReducersAction from '../redux/reducers/auth';
import * as Validation from '../helpers/validation';
import Button from '../components/buttons/Button';
import MyDialog from '../components/MyDialog';
import CenteredCard from '../components/card/CenteredCard';

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
    <CenteredCard>
      <div>
        <div className="card-title">Login</div>
        <LoginForm className="card-body" onSubmit={submitAction} status={store.status} />
        <div className="card-actions justify-end">
          <button type="button" onClick={toRegister}>Register</button>
          <Link to="/forgot-password">forgot password</Link>
          <MyDialog open={store.status === `${authAction.loginActionType}/rejected`} title="Login Gagal" desc={store.error?.message} handleToClose={() => { dispatch(authReducersAction.handleChangeStatus('idle')); }} />
        </div>
      </div>
    </CenteredCard>
  );
}

function LoginForm({ onSubmit, status }) {
  return (
    <Formik
      className="form-control"
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
          <Button type="submit" isLoading={status === 'LOADING'}>Login</Button>

        </Form>
      )}
    </Formik>
  );
}

export default Login;
