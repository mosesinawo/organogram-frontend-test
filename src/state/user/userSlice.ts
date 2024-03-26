import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./user.types";

const initialState: IUser = {
  email: "",
  token: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.isLoggedIn = false;
      Object.assign(state, initialState);
    },
  },
});

export const { setToken, setEmail, removeToken } = userSlice.actions;
export const getToken = (state: any) => state.user.token;

export default userSlice.reducer;
