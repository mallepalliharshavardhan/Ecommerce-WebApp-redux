import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "productFilters",
  initialState: {
    searchText: "",
    selectedCategory: "All Categories",
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearFilters: (state) => {
      state.searchText = "";
      state.selectedCategory = "All Categories";
    },
  },
});

export const { setSearchText, setSelectedCategory, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
