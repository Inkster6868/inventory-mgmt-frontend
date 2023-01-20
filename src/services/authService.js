import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {      /* validating email */
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


// Register User
export const registerUser = async (userData) => {           /* this userData is the email and pass that we will receive from the user when he tries to create aaccount */
  try {
    const response = await axios.post(                         /* the backend has a post request on this API endpoint , the first argument is the API link to send req to, the second is the Data that we are going to send, and the third one {withCredentials:true} is used, when suppose we are sending the cookie to the browser from the backend, by default the cookies aren't passes in a fetch req or axios req, so we enable this option to get the cookies in the browser */
      `${BACKEND_URL}/api/users/register`,
      userData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {                                /* statusText is an inbuilt property that comes with axios */
      toast.success("User Registered successfully");
    }
    return response.data;                                                /* the res.send() is the response */
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||           /* these are all the possibilities where error may occur like if the data is not adequate, or the authentication is wrong, or some response error from server, so we check them using operators and store them into a variable */
      error.message ||
      error.toString();
    toast.error(message);
  }
};


// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,    /* same as register , we send a request to the backend, it then authenticates it and sends back the response if succesfful or error if not */
      userData
    );
    if (response.statusText === "OK") {
      toast.success("Login Successful...");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`);        /* same as login , but nothing to do here because we are just logging out , so no response is sent we only navigate to the login page here */
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};


// Forgot Password
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/forgotpassword`,
      userData
    );
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};


// Reset Password
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(                                      /* give a put req to resetpassword */
      `${BACKEND_URL}/api/users/resetpassword/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get Login Status
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};


// Get User Profile
export const getUser = async () => {           /* cookies se access krega backend data ko if user exists or not */
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/getuser`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
// Update Profile
export const updateUser = async (formData) => {
  try {
    const response = await axios.patch(                   /* we send the request along with the formData to patch to the database */
      `${BACKEND_URL}/api/users/updateuser`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Update Profile(change password)
export const changePassword = async (formData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/changepassword`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
