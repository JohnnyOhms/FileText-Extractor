import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Camera: false,
  Result: false,
  displayFile: false,
  fileData: [],
  top: true,
  bottom: false,
  extractedText: "",
  count: 0,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openCamera: (state, action) => {
      state.Camera = !state.Camera;
    },
    openResult: (state, action) => {
      state.Result = !state.Result;
    },
    displayFile: (state, action) => {
      state.displayFile = true;
    },
    addFileData: (state, action) => {
      const data = action.payload;
      if (data) {
        state.fileData[0] = data;
      }
    },
    topBtn: (state, action) => {
      state.top = !state.top;
      state.bottom = true;
    },
    bottomBtn: (state, action) => {
      state.bottom = !state.bottom;
      state.top = true;
    },
    addText: (state, action) => {
      if (action.payload) {
        state.extractedText = action.payload;
      }
    },
    reRenderComponent: (state, action) => {
      state.count++;
    },
  },
});

export const {
  openCamera,
  openResult,
  displayFile,
  addFileData,
  topBtn,
  bottomBtn,
  addText,
  reRenderComponent,
} = globalSlice.actions;

export default globalSlice.reducer;
