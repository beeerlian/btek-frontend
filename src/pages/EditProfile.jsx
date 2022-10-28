import { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import FormData from 'form-data';
import MyButton from '../components/buttons/MyButton';
import profileRepo from '../repositories/profile.repo';
import BackButton from '../components/buttons/BackButton';

function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    profile: location.state,
    status: 'INITIAL',
    errMsg: '',
  });

  const updateProfile = async (val) => {
    setData({
      ...data,
      status: 'LOADING',
    });
    try {
      const { fullName, image, birthDate } = val;
      const form = new FormData();
      form.append('fullName', fullName);
      form.append('picture', image);
      form.append('birthDate', birthDate);
      await profileRepo.updateProfile(form);
      navigate(-1);
    } catch (error) {
      setData({
        ...data,
        status: 'ERROR',
        errMsg: error.response.data.message,
      });
    }
  };

  return (
    <div className="edit-profile">
      {(data.status === 'ERROR')
        ? <p>{data.errMsg}</p> : null}
      <div>Edit Profile</div>
      <EditProfileForm status={data.status} onSubmit={updateProfile} initial={data.profile} />
      <BackButton />
    </div>
  );
}

function EditProfileForm({ onSubmit, status, initial }) {
  console.log(initial);
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
          <MyButton type="submit" isLoading={status === 'LOADING'}>Save</MyButton>
        </Form>
      )}
    </Formik>
  );
}

export default EditProfile;
