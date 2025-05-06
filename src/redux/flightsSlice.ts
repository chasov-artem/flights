import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Flight } from "../types";
import { flightsApi } from "../api/flightsApi";

interface FlightsState {
  flights: Flight[];
  loading: boolean;
  error: string | null;
}

const initialState: FlightsState = {
  flights: [],
  loading: false,
  error: null,
};

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async () => {
    const response = await flightsApi.getAllFlights();
    return response;
  }
);

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
        state.error = null;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка при завантаженні рейсів";
      });
  },
});

export default flightsSlice.reducer;
