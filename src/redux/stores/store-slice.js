import { createSlice } from '@reduxjs/toolkit';
import { getStores } from './stores-operation';

export const initialState = {
  storesData: [],
  storeName: [],

  loading: false,
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getStores.fulfilled, (state, { payload }) => {
        state.storesData = payload;
        state.loading = false;
      })
      .addCase(getStores.rejected, (state, _) => {
        state.loading = false;
      });
  },
});

export const storesReducer = storeSlice.reducer;
