import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { API } from '../../service/deliveryAPI';
import { GETOLDORDER } from './order-types';

export const getoldOrder = createAsyncThunk(
  GETOLDORDER,
  async (_, { rejectedWithValue }) => {
    try {
      const { data } = await API.get(GETOLDORDER);
      return data;
    } catch (error) {
      toast.error('Помилка отримання даних');
      return rejectedWithValue(error);
    }
  }
);
