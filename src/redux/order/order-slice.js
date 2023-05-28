import { createSlice } from '@reduxjs/toolkit';
import { getoldOrder } from './order-operation';

export const initialState = {
  preOrders: [],
  oldOrder: [],
  order: {},

  loading: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getoldOrder.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getoldOrder.fulfilled, (state, { payload }) => {
        state.oldOrder = payload;
        state.loading = false;
      })
      .addCase(getoldOrder.rejected, (state, _) => {
        state.loading = false;
      });
  },
  reducers: {
    addToPreOrder: (state, { payload }) => {
      state.preOrders.push(payload);
    },
    deleteItem: (state, { payload }) => {
      state.preOrders.filter(({ id }) => id !== payload);
    },

    changeCount: (state, { payload }) => {
      state.preOrders = state.preOrders.filter(({ id }) => id !== payload.id);
      state.preOrders.push(payload);
    },
  },
});
export const { addToPreOrder, deleteItem, changeCount } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
