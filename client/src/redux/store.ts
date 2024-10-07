import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;  
