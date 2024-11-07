import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice.js"
import userSlice from "./userSlice.js"
export const store = configureStore({
  reducer: {
    // Add your reducers here
    users:usersSlice,
    user:userSlice
  },
});
