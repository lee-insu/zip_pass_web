import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  age?: number;
  location?: string;
  house?: string;
  contract?: string;
  deposit?: string;
  monthly?: string;
  area?: string;
  room?: string;
  live?: string;
  welfare?: string;
  salary?: string;
  job?: string;
  car?: string;
}

interface UserState {
  isLoggedIn: boolean;
  userData: UserData | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.isLoggedIn = true;
      state.userData = {
        uid: action.payload.uid,
        displayName: action.payload.displayName || "",
        email: action.payload.email || "",
        photoURL: action.payload.photoURL || "",
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
    updateAdditionalUserData: (
      state,
      action: PayloadAction<Partial<UserData>>
    ) => {
      if (state.userData) {
        state.userData = {
          ...state.userData,
          ...action.payload,
        };
      }
    },
  },
});

export const {login, logout, updateAdditionalUserData} = userSlice.actions;

export default userSlice.reducer;
