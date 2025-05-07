export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  terminal: string;
  gate: string;
  totalSeats: number;
  remainingSeats: number;
  seats: Seat[];
}

export interface Seat {
  id: string;
  number: string;
  isAvailable: boolean;
}

export interface CartItem {
  flightId: string;
  seatId: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

export interface RootState {
  cart: CartState;
  flights: FlightsState;
}

export interface CartState {
  items: CartItem[];
}

export interface FlightsState {
  flights: Flight[];
  selectedFlight: Flight | null;
  loading: boolean;
  error: string | null;
}
