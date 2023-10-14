import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import globalSlice from "../slice/globalSlice";
import LoadtextSlice from "../slice/LoadtextSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    global: globalSlice,
    loadText: LoadtextSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
