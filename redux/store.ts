import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

// Import your reducers here

import loginReducer from './apps/LoginSlice';
import profileReducer from './apps/ProfileSlice';

const rootReducer = combineReducers({
  // Add your reducers here
  login: loginReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: 'rootAppSteam',
  storage: AsyncStorage,
  // Optionally, you can whitelist or blacklist specific reducers
  // whitelist: ['reducer1', 'reducer2']
  // blacklist: ['reducerToExclude']
  whitelist: ['login', 'profile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
