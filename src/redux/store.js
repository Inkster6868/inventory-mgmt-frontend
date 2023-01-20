import { configureStore } from "@reduxjs/toolkit";       //n redux we used 'createStore' which was deprecated so in toolkit we are using configurestorw
import authReducer from "../redux/features/auth/authSlice";  // imports all the reducers from authSlice
import productReducer from  "../redux/features/product/productSlice"
import filterReducer from "../redux/features/product/filterSlice"

export const store=configureStore({
    reducer :{
        auth:authReducer,
        product:productReducer,
        filter:filterReducer
    }
});