import { createSlice } from "@reduxjs/toolkit";

// Object.keys(JSON.parse(localStorage.getItem("user"))).length === 1 ? true : false,
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignIn:
      typeof JSON.parse(localStorage.getItem("user")) === "object"
        ? true
        : false,
  },
  reducers: {
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      state.isSignIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
