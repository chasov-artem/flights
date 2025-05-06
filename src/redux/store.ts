import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import flightsReducer from "./flightsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    flights: flightsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
