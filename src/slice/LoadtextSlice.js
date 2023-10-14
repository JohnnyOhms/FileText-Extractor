import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

export const loadTextData = createAsyncThunk(
  "LoadText/loadTextData",
  async (req, { rejectWithValue }) => {
    const { url } = req;
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const LoadTextSlice = createSlice({
  name: "LoadText",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTextData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTextData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadTextData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default LoadTextSlice.reducer;
