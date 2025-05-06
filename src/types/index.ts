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
}

export interface Seat {
  row: number;
  seat: string; // A-F
  isOccupied: boolean;
}

export interface CartItem {
  flightId: string;
  seat: Seat;
  price: number;
  flightDetails: Flight;
}

export interface RootState {
  cart: CartState;
}

export interface CartState {
  items: CartItem[];
}
