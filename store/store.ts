import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./SavedSlice";

export const store = configureStore({
  reducer: {
    saved: Reducer,
  },
});

// here store.getState is just a function and we just need to return the type of what that function will return. 
// It basically returns the entire application State
export type RootState = ReturnType<typeof store.getState>;

// here we will return the function as well but we will send parameters inside that function, so we didn't use ReturnType
export type AppDispatch = typeof store.dispatch;
