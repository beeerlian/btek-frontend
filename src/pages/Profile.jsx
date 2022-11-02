import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as profileAction from '../redux/asyncActions/profile';

import ConditioningRender from '../components/ConditioningRender';
import BackButton from '../components/buttons/BackButton';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);

  const getProfileData = () => {
    dispatch(profileAction.getProfile());
  };

  useEffect(() => {
    if (store.status === `${profileAction.updateProfileActionType}/fulfilled` || !store.profile) {
      getProfileData();
    }
  }, []);

  return (
    <ConditioningRender
      onRefresh={() => { getProfileData(); }}
      status={store.status}
      actionType={`${profileAction.getProfileActionType}`}
      errMessage={store.error?.message}
    >
      <div className="profile">
        <ProfileTile title="Name" data={store.profile?.fullName} />
        <ProfileTile title="Birth Date" data={store.profile?.birthDate} />
        <ProfileTile title="Picture" data="" />
        <img className="profile-image" src={`http://localhost:8081/assets/uploads/${store.profile?.picture}`} alt={store.profile?.fullName} />
        <br />
        <BackButton />
        <button type="button" onClick={() => { navigate('/profile/edit', { state: store.profile }); }}>Edit</button>
      </div>
    </ConditioningRender>
  );
}

function ProfileTile({ title, data }) {
  return (
    <div>
      {title}
      {' '}
      :
      {' '}
      {data || ''}
    </div>
  );
}

export default Profile;
