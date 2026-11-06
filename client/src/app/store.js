import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../features/products/productApi.js";
import cartReducer from "../features/cart/cartSlice.js";
import productFiltersReducer from "../features/products/filterSlice.js";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart: cartReducer,
    productFilters: productFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
