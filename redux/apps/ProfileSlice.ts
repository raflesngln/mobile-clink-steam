import type { RootState } from "@/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface profile {
  dataLogin: {
    idUser: string;
    email: string;
    phone: string;
    isLogin: boolean;
    firstOpenApp: boolean;
    username: string;
    profilePicture: string;
    value: number;
    token: string;
    head_driver: number;
  };
  UImode: string;
  shouldRefresh: boolean;
  language: string;
  dispatch_id: string[];
  versionApp: string;
}

const initialState: profile = {
  dataLogin: {
    idUser: "",
    email: "",
    phone: "",
    isLogin: false,
    firstOpenApp: true,
    username: "rafles",
    profilePicture: "",
    value: 0,
    head_driver: 0,
    token: "",
  },
  UImode: "light",
  shouldRefresh: false,
  language: "id",
  dispatch_id: [],
  versionApp: "1.0.0",
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // setDataLogin: (state, action: PayloadAction<any>): void => {
    //   // state.isLogin = action.payload;
    //   // state.username = action.payload;
    //   // state.profilePicture = action.payload;
    //   state.dataLogin = action.payload;
    // },
    setDataLogin: (
      state,
      action: PayloadAction<Partial<profile["dataLogin"]>>
    ): void => {
      state.dataLogin = {
        ...state.dataLogin,
        ...action.payload,
      };
    },
    logout: (state: {
      dataLogin: {
        idUser: string;
        email: string;
        phone: string;
        isLogin: boolean;
        firstOpenApp: boolean;
        username: string;
        profilePicture: string;
        value: number;
        head_driver: number;
        token: string;
      };
      shouldRefresh: boolean;
      language: string;
    }) => {
      state.dataLogin.idUser = "";
      state.dataLogin.email = "";
      state.dataLogin.phone = "";
      state.dataLogin.isLogin = false;
      state.dataLogin.firstOpenApp = true;
      state.dataLogin.username = "";
      state.dataLogin.profilePicture = "";
      state.dataLogin.value = 0;
      state.dataLogin.head_driver = 0;
      state.dataLogin.token = "";
      state.shouldRefresh = false;
      state.language = "id";
    },
    changeDarkMode: (
      state: { UImode: any },
      action: PayloadAction<any>
    ): void => {
      state.UImode = action.payload;
    },
    // menangani halaman di refresh ulang saat kembali dari halaman sebelumnya
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    changeVersionApp: (state, action: PayloadAction<string>) => {
      state.versionApp = action.payload;
    },
    // menangani halaman di refresh ulang saat kembali dari halaman sebelumnya
    changeShouldRefresh: (state, action: PayloadAction<boolean>) => {
      state.shouldRefresh = action.payload;
    },
    // Fungsi untuk mengisi array dispatch_id (menambah item)
    addDispatchId: (state, action: PayloadAction<string>) => {
      if (!state.dispatch_id) {
        state.dispatch_id = [];
      }

      // Cek apakah ID sudah ada di array
      if (!state.dispatch_id.includes(action.payload)) {
        state.dispatch_id.push(action.payload);
      }
    },
    // Fungsi untuk menambah multiple dispatch_id sekaligus
    addMultipleDispatchIds: (state, action: PayloadAction<string[]>) => {
      state.dispatch_id = [...state.dispatch_id, ...action.payload];
    },

    // Fungsi untuk menghapus dispatch_id berdasarkan value
    removeDispatchId: (state, action: PayloadAction<string>) => {
      state.dispatch_id = state.dispatch_id.filter(
        (id: any) => id !== action.payload
      );
    },
    // Fungsi untuk mengosongkan seluruh array dispatch_id
    clearDispatchIds: (state) => {
      state.dispatch_id = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDataLogin,
  changeLanguage,
  changeDarkMode,
  logout,
  changeShouldRefresh,
  addDispatchId,
  addMultipleDispatchIds,
  removeDispatchId,
  clearDispatchIds,
  changeVersionApp
} = ProfileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.login;

export default ProfileSlice.reducer;
