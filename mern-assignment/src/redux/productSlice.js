import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch categories
export const fetchCategories = createAsyncThunk('product/fetchCategories', async () => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  return response.data;
});

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ limit = 10, skip = 0, category = '', search = '' }) => {
    let url;

    const formatCategory = (category) => category.replace(/\s+/g, '-').toLowerCase();

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    } else if (category) {
      const formattedCategory = formatCategory(category.name);
      url = `https://dummyjson.com/products/category/${formattedCategory}?limit=${limit}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }

    const response = await axios.get(url);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    categories: [],
    products: [],
    selectedCategory: '',
    currentPage: 0,
    totalProducts: 0,
    searchQuery: '',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 0; // Reset page when category changes
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    decrementPage: (state) => {
      state.currentPage -= 1;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalProducts = action.payload.total; // Store total for pagination
      });
  },
});

export const { setSelectedCategory, incrementPage, decrementPage, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
