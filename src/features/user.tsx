import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../dashboard-portal/src/Interfaces/IUser";

const initialStateValue: IUser = {
  id: 0,
  name: "",
  email: "",
  password: "",
  isLoggedIn: false,
  createdAt: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    setRefreshLogin: (state, action) => {
      state.value = action.payload;
    },
    login: (state, action) => {
      const user: IUser = { ...action.payload, isLoggedIn: true };
      localStorage.setItem("user", JSON.stringify(user));
      state.value = user;
    },
    logout: (state) => {
      state.value = initialStateValue;
      localStorage.removeItem("user");
    },
  },
});


export const { setRefreshLogin, login, logout } = userSlice.actions;

export default userSlice.reducer;