import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileRepo from '../repositories/profile.repo';
import ConditioningRender from '../components/ConditioningRender';
import BackButton from '../components/buttons/BackButton';

function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    profile: null,
    status: 'LOADING',
    errMessage: null,
  });

  const getProfileData = async () => {
    setData({
      ...data,
      status: 'LOADING',
    });
    try {
      const res = await profileRepo.getProfile();
      setData({
        profile: res.data.result,
        status: 'SUCCESS',
      });
    } catch (error) {
      setData({
        ...data,
        status: 'ERROR',
        errMessage: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <ConditioningRender
      onRefresh={() => { getProfileData(); }}
      status={data.status}
      errMessage={data.errMessage}
    >
      <div className="profile">
        <ProfileTile title="Name" data={data?.profile?.fullName} />
        <ProfileTile title="Birth Date" data={data?.profile?.birthDate} />
        <ProfileTile title="Picture" data={data?.profile?.picture} />
        <BackButton />
        <button type="button" onClick={() => { navigate('/profile/edit', { state: data.profile }); }}>Edit</button>
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
      {data || 'Kosong'}
    </div>
  );
}

export default Profile;