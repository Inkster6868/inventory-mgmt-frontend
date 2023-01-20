import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Product
export const createProduct = createAsyncThunk(               /* check the states below what actions are they performing fullfileed, pending,rejected */
  "products/create",
  async (formData, thunkAPI) => {         /* thunkAPI returns us 3 states of promises of the request that we make "pending,fullfilled,rejected" */
    try {
      return await productService.createProduct(formData);   /* fromproductService */
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);    /* rejectWithValue(value, [meta]): rejectWithValue is a utility function that you can return (or throw) in your action creator to return a rejected response with a defined payload and meta. It will pass whatever value you give it and return it in the payload of the rejected action. If you also pass in a meta, it will be merged with the existing rejectedAction.meta. */
    }
  }
);


// Get all products
export const getProducts = createAsyncThunk(                       /* check the states below what actions are they performing fullfileed, pending,rejected */
  "products/getAll",
  async (_, thunkAPI) => {                                     /* we are not going to send any data to the backend so we put a underscore there */
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
   

// Delete a Product
export const deleteProduct = createAsyncThunk(                        /* check the states below what actions are they performing fullfileed, pending,rejected */
  "products/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);     /* send id to the delete product function */
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get a product
export const getProduct = createAsyncThunk(              /* check the states below what actions are they performing fullfileed, pending,rejected */
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);     /* if there is any error we send it through payload with reject function */
    }
  }
);


// Update product
export const updateProduct = createAsyncThunk(             /* check the states below what actions are they performing fullfileed, pending,rejected */
  "products/updateProduct",
  async ({ id, formData }, thunkAPI) => {                   
    try {
      return await productService.updateProduct(id, formData);   /* we patch the API with the formData which contains the updated specification of the product */
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);










/* CREATE SLICE */
const productSlice = createSlice({
  name: "product",       /* name of this slice  */
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) { 
      const products = action.payload;         /* we get the array in the payload */
      const array = [];
      products.map((item) => {
        const { price, quantity } = item;
        const productValue = price * quantity;     /* value of single product, we calculate this for every product in the array */
        return array.push(productValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;                                       /* har ek noofproduct*price ek array mai store kara liya aur fir usse, reduce fnction ki help se sum karake totalvalue return karadi */
      }, 0);                                           /* 0 is the initialval for a which is also known as accumulator commonly */
      state.totalStoreValue = totalValue;
    },

    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload;      /* we get the array in the payload */
      const array = [];
      products.map((item) => {
        const { quantity } = item;       /* for every item we destructue its quantitiy and push into the array */ 
        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {                         /* if anywhere in aaray '0' is inserted it means that some product has 0 quanity so we increase the count by 1 */
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },

    CALC_CATEGORY(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { category } = item;        /* we take out category form the products array for evry item  */

        return array.push(category);              /* and push it into the array */
      });
      const uniqueCategory = [...new Set(array)];   /* Set can only contain unique values, so we use new set(array) to store only the unique categories, i.e each category name will be stored once only and then '...' spread helps us to convert it back into an array */
      state.category = uniqueCategory;       /* now we set the product */
    },
  },














  extraReducers: (builder) => {         /* extra reducers are used to respond to the states which are not included in our slice. */
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);    /* this will help us see what product has been added */
        state.products.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;       /* whatever message we will get from the server */
        toast.error(action.payload);
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);             /* this payload will be the response/object that we will be receiving from the backend as a response */
        state.products = action.payload;    /* we get the response from the bacekend in the products[] array  */
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;    /* we set the payload to "product" */
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
  productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectProduct = (state) => state.product.product;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;

export default productSlice.reducer;
