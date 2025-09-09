import type { RootState } from '@/redux/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface LoginState {
  dataLogin: {
    isLogin: boolean;
    token: string;
    username: string;
    name: string;
    profilePicture: string;
    email: string;
    value: number;
    head_driver: number;
    itHasEverLogin: boolean;
  };
  UImode: string;
}

const initialState: LoginState = {
  dataLogin: {
    isLogin: false,
    token: '',
    username: '',
    name: '',
    profilePicture: '',
    email: '',
    value: 0,
    head_driver: 0,
    itHasEverLogin: false,
  },
  UImode: 'light',
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setDataLogin: (state, action: PayloadAction<any>): void => {
      // state.isLogin = action.payload;
      // state.username = action.payload;
      // state.profilePicture = action.payload;
      state.dataLogin = action.payload;
    },
    logout: state => {
      state.dataLogin.isLogin = false;
      state.dataLogin.username = '';
      state.dataLogin.head_driver = 0;
      state.dataLogin.profilePicture = '';
    },
    changeDarkMode: (state, action: PayloadAction<any>): void => {
      state.UImode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setDataLogin, changeDarkMode, logout} = LoginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.login;

export default LoginSlice.reducer;
