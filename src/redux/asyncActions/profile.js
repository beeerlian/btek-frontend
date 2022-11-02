import { createAsyncThunk } from '@reduxjs/toolkit';
import FormData from 'form-data';
import profileService from '../../repositories/profile.repo';

export const getProfileActionType = 'profile/getProfile';
export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async () => {
    const { data } = await profileService.getProfile();
    return data;
  },
);

export const updateProfileActionType = 'profile/updateProfile';
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (val) => {
    const { fullName, image, birthDate } = val;
    const form = new FormData();
    form.append('fullName', fullName);
    form.append('picture', image);
    form.append('birthDate', birthDate);
    const { data } = await profileService.updateProfile(form);
    return data;
  },
);
