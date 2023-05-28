import { createSlice } from '@reduxjs/toolkit';
import { getoldOrder } from './order-operation';

export const initialState = {
  preOrders: [],
  oldOrder: [],
  order: {},
  total_price: 0,

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
    countPrice: (state, { payload }) => {
      state.total_price = state.preOrders.reduce((sum, { price, count }) => {
        return Math.round((sum + +(price * count)) * 100) / 100;
      }, 0);
    },
    correctPrice: (state, { payload }) => {
      if (payload.act === '+') {
        state.total_price = state.total_price + +payload.price;
        return;
      }
      if (payload.act === '-') {
        state.total_price = state.total_price - +payload.price;
      }
    },
    deleteItem: (state, { payload }) => {
      state.preOrders = state.preOrders.filter(({ id }) => id !== payload);
    },
    changeCount: (state, { payload }) => {
      state.preOrders = state.preOrders.filter(({ id }) => id !== payload.id);
      state.preOrders.push(payload);
    },
  },
});
export const {
  addToPreOrder,
  deleteItem,
  changeCount,
  countPrice,
  correctPrice,
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
