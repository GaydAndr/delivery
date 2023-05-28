import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { API } from '../../service/deliveryAPI';
import { GETSTORE } from './store-types';

export const getStores = createAsyncThunk(
  GETSTORE,
  async (_, { rejectedWithValue }) => {
    try {
      const { data } = await API.get(GETSTORE);
      return data;
    } catch (error) {
      toast.error('Помилка отримання даних');
      return rejectedWithValue(error);
    }
  }
);
