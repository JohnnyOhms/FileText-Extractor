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

const TextSlice = createSlice({
  name: "LoadText",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    saveText: async (state, action) => {
      if (action.payload) {
        try {
          const res = await api.post("/savetext", action.payload);
          alert("text saved successfully");
          return res;
        } catch (error) {
          alert("something went wrong");
        }
      }
    },
    deleteText: async (state, action) => {
      if (action.payload) {
        const res = await api.post("/deletetext", action.payload);
        await state.data.filter(
          (item) => item.textId !== action.payload.textId
        );
        return res;
      }
    },
    deleteAllText: async (state, action) => {
      if (action.payload) {
        const res = await api.post("deletealltext", action.payload);
        for (let i = 0; i < state.data.length; i++) {
          state.data.pop();
        }
        return res;
      }
    },
  },
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

export const { saveText, deleteText, deleteAllText } = TextSlice.actions;

export default TextSlice.reducer;
