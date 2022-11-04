import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as profileAction from '../redux/asyncActions/profile';

import ConditioningRender from '../components/ConditioningRender';
import BackButton from '../components/buttons/BackButton';

import Button from '../components/buttons/Button';
import CenteredCard from '../components/card/CenteredCard';

function Profile({ token }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);

  const getProfileData = () => {
    dispatch(profileAction.getProfile(token));
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
      <CenteredCard>
        <div className="place-items-center">
          <div className="avatar self-center">
            <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 self-center">
              <img src={`${import.meta.env.VITE_API_URL}/assets/uploads/${store.profile?.picture}`} alt={store.profile?.fullName} />
            </div>
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{store.profile?.fullName}</h2>
            <p>{store.profile?.birthDate}</p>
            <div className="card-actions justify-end">
              <BackButton>Back</BackButton>
              <Button className="btn btn-primary" onClick={() => { navigate('/profile/edit', { state: store.profile }); }}>Edit</Button>
            </div>
          </div>
        </div>

      </CenteredCard>
    </ConditioningRender>
  );
}
export default Profile;
