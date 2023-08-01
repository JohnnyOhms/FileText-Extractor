import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import globalSlice from "../slice/globalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    global: globalSlice,
  },
});
