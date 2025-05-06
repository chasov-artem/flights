import axios from "axios";
import { Flight } from "../types";

const BASE_URL = "https://679d13f487618946e6544ccc.mockapi.io/testove/v1";

export const flightsApi = {
  getAllFlights: async (): Promise<Flight[]> => {
    const response = await axios.get(`${BASE_URL}/flights`);
    return response.data;
  },

  getFlightById: async (id: string): Promise<Flight> => {
    const response = await axios.get(`${BASE_URL}/flights/${id}`);
    return response.data;
  },
};
