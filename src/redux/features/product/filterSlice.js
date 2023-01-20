import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],                          /* initially the search box will be empty so no filtered products ony an empty array */
};

const filterSlice = createSlice({
  name: "filter",                              /* name of the slice */
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {            
      const { products, search } = action.payload;          /* so we will be receving the products array , and the search request input,  */
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||         /* we will apply a .filter() function where either the 'name' or 'category' of product includes the "input string" given by the user, and then return the filtered array.  */
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;         /* then we change the state of filteredProducts array and set it to tempProducts */
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;        /* export the action */

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;       /* export the state */

export default filterSlice.reducer;        /* export the reducer  */
