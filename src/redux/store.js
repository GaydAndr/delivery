import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { storesReducer } from './stores/store-slice';
import { orderReducer } from './order/order-slice';

const persistConfig = {
  key: 'stores',
  storage,
  whitelist: [''],
};
const persistOrderConfig = {
  key: 'orders',
  storage,
  whitelist: ['preOrders', 'oldOrder'],
};

const persistedStores = persistReducer(persistConfig, storesReducer);
const persistedOrder = persistReducer(persistOrderConfig, orderReducer);

const store = configureStore({
  reducer: {
    stores: persistedStores,
    orders: persistedOrder,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);
export { store, persistor };
