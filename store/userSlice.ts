import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
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
  },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
