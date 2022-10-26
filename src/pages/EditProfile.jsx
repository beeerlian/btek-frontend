import { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
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

  const updateProfile = async (e) => {
    e.preventDefault();
    setData({
      ...data,
      status: 'LOADING',
    });
    try {
      const form = {
        fullName: e.target.fullName.value,
        picture: e.target.picture.value,
        birthDate: e.target.birthDate.value,
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
      <form onSubmit={updateProfile}>
        <input type="text" name="fullName" value={location.state.fullName} />
        <br />
        <input type="text" name="picture" value={location.state.picture} />
        <br />
        <input type="text" name="birthDate" value={location.state.birthDate} />
        <br />
        <BackButton />
        <MyButton type="submit" isLoading={data.status === 'LOADING'}>Save</MyButton>
      </form>
    </div>
  );
}

export default EditProfile;
