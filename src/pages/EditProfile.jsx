import { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import MyButton from '../components/buttons/MyButton';
import profileRepo from '../repositories/profile.repo';
import BackButton from '../components/buttons/BackButton';

function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    profile: location.state,
    status: 'INITIAL',
  });

  const updateProfile = async ({ fullName, picture, birthDate }) => {
    setData({
      ...data,
      status: 'LOADING',
    });
    try {
      const form = {
        fullName,
        picture,
        birthDate,
      };
      const encoded = new URLSearchParams(form);
      await profileRepo.updateProfile(encoded.toString());
      navigate(-1);
    } catch (error) {
      setData({
        ...data,
        status: 'ERROR',
      });
    }
  };

  return (
    <div className="edit-profile">
      {(data.status === 'ERROR')
        ? <p>Error</p> : null}
      <div>Edit Profile</div>
      <EditProfileForm status={data.status} onSubmit={updateProfile} />
      <BackButton />
    </div>
  );
}

function EditProfileForm({ onSubmit, status }) {
  return (
    <Formik
      initialValues={{
        fullName: '',
        picture: '',
        birthDate: '',
      }}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="fullName" type="text" placeholder="fullName" />
          {errors.fullName && touched.fullName ? <div className="form-error-msg">{errors.fullName}</div> : null}
          <br />
          <Field name="picture" type="text" placeholder="Picture" />
          {errors.picture && touched.picture ? (<div className="form-error-msg">{errors.picture}</div>) : null}
          <br />
          <Field name="birthDate" type="text" placeholder="Birt Date" />
          {errors.birthDate && touched.birthDate ? (<div className="form-error-msg">{errors.birthDate}</div>) : null}
          <br />
          <MyButton type="submit" isLoading={status === 'LOADING'}>Save</MyButton>
        </Form>
      )}
    </Formik>
  );
}

export default EditProfile;
