import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Camera: false,
  displayFile: false,
  fileData: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openCamera: (state, action) => {
      state.Camera = !state.Camera;
    },
    displayFile: (state, action) => {
      state.displayFile = !state.displayFile;
    },
    addFileData: (state, action) => {
      const data = action.payload;
      if (data) {
        state.fileData.push(data);
      }
    },
  },
});

export const { openCamera, displayFile, addFileData } = globalSlice.actions;

export default globalSlice.reducer;
