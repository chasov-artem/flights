import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "./flightsSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    flights: flightsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
