import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as profileAction from '../redux/asyncActions/profile';
import MyButton from '../components/buttons/MyButton';
import BackButton from '../components/buttons/BackButton';

function EditProfile() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);
  const location = useLocation();

  const navigate = useNavigate();

  const updateProfile = (val) => {
    dispatch(profileAction.updateProfile(val));
  };

  useEffect(() => {
    if (store.status === `${profileAction.updateProfileActionType}/fulfilled`) {
      navigate(-1);
    }
  }, [store]);

  return (
    <div className="edit-profile">
      <img className="profile-image" src={`http://localhost:8081/assets/uploads/${location.state?.picture}`} alt={store.profile?.fullName} />
      {(store.status === `${profileAction.updateProfileActionType}/rejected`)
        ? <p>{store.errMsg}</p> : null}
      <div>Edit Profile</div>
      <EditProfileForm status={store.status} onSubmit={updateProfile} initial={location.state} />
      <BackButton />
    </div>
  );
}

function EditProfileForm({ onSubmit, status, initial }) {
  const [image, setImage] = useState(null);
  const onImagePicked = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <Formik
      initialValues={{
        fullName: initial.fullName,
        picture: null,
        birthDate: initial.birthDate,
      }}
      onSubmit={({ fullName, birthDate }) => {
        onSubmit({ fullName, image, birthDate });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="fullName" type="text" placeholder="fullName" />
          {errors.fullName && touched.fullName ? <div className="form-error-msg">{errors.fullName}</div> : null}
          <br />
          <input name="picture" type="file" accept="image/*" onChange={onImagePicked} placeholder="Picture" />
          {/* <Field name="picture" type="file" accept="image/*" placeholder="Picture" /> */}
          {errors.picture && touched.picture ? (<div className="form-error-msg">{errors.picture}</div>) : null}
          <br />
          <Field name="birthDate" type="text" placeholder="Birt Date" />
          {errors.birthDate && touched.birthDate ? (<div className="form-error-msg">{errors.birthDate}</div>) : null}
          <br />
          <MyButton type="submit" isLoading={status === 'pending'}>Save</MyButton>
        </Form>
      )}
    </Formik>
  );
}

export default EditProfile;
