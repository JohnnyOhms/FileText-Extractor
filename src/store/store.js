import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import globalSlice from "../slice/globalSlice";
import textSlice from "../slice/textSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    global: globalSlice,
    loadText: textSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
