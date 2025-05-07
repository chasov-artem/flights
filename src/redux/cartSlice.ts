import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  flightId: string;
  seatId: string;
  price: number;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ flightId: string; seatId: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.flightId === action.payload.flightId &&
            item.seatId === action.payload.seatId
          )
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", "[]");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
