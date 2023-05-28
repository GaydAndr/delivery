import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { API } from '../../service/deliveryAPI';
import { GETOLDORDER, POSTORDER } from './order-types';

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
export const postOrder = createAsyncThunk(
  POSTORDER,
  async (credentials, { rejectedWithValue }) => {
    try {
      const { data } = await API.post(POSTORDER, credentials);
      toast.success('Замовлення відпрвавлене');

      return data;
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        toast.error(error.response.data);
        return error.response.data;
      }
      return rejectedWithValue(error);
    }
  }
);
