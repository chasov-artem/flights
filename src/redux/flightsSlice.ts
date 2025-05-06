import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Flight } from "../types";
import { flightsApi } from "../api/flightsApi";

interface FlightsState {
  flights: Flight[];
  selectedFlight: Flight | null;
  loading: boolean;
  error: string | null;
}

const initialState: FlightsState = {
  flights: [],
  selectedFlight: null,
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

export const fetchFlightById = createAsyncThunk(
  "flights/fetchFlightById",
  async (id: string) => {
    const response = await flightsApi.getFlightById(id);
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
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка при завантаженні рейсів";
      })
      .addCase(fetchFlightById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlightById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFlight = action.payload;
      })
      .addCase(fetchFlightById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка при завантаженні рейсу";
      });
  },
});

export default flightsSlice.reducer;
