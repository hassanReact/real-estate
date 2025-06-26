import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authSlice";
import AllPropertySlice from "./reducer/AllPropertySlice";


const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [AllPropertySlice.name]: AllPropertySlice.reducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;