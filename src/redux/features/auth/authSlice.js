import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"))

const initialState = {
  isLoggedIn: false,                       /* checks whether user is logged in or not and changes accordingly */                 /* now we are saving the name into localStorage because there are several palces where we need to use the clients name, so i do not want to unnecessarily create load on the server and also slow loading, also if the user refreshes the tab we do not want to make request to backend for getting user again */
  name:name ? name: "",
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {                               /* the payload , in our case will be the value that we receive from backend that whether the user is loggedIn or not */
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));      /* setting the name in local storage first */
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;        /* so the value of action.payload that we will get will be a object  */
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;  /* pointing to statee inside the authSlice */
export const selectName = (state) => state.auth.name;   
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
