export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
  remainingSeats: number;
  terminal: string;
  gate: string;
}
