import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  isLoggedIn: boolean,
  createdAt?: Date,
};
const initialStateValue: User = {
  id: 0,
  name: "",
  email: "",
  password: "",
  isLoggedIn: false,
  createdAt: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
  },
});



export const { login, logout } = userSlice.actions;

export default userSlice.reducer;