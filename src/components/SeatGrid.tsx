import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import type { Flight } from "../types";
import { addToCart } from "../redux/cartSlice";

interface SeatGridProps {
  flight: Flight;
}

interface Seat {
  row: number;
  seat: string;
  isOccupied: boolean;
}

export const SeatGrid: React.FC<SeatGridProps> = ({ flight }) => {
  const dispatch = useDispatch();
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // Генерація сітки місць
  const generateSeats = () => {
    const rows = 10;
    const seatsPerRow = 6;
    const seatLetters = ["A", "B", "C", "D", "E", "F"];

    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
        row: rowIndex + 1,
        seat: seatLetters[seatIndex],
        isOccupied: Math.random() > 0.7, // 30% шанс що місце зайняте
      }))
    );
  };

  const seats = generateSeats();

  const handleSeatClick = (seat: Seat) => {
    if (!seat.isOccupied) {
      setSelectedSeat(seat);
    }
  };

  const handleAddToCart = () => {
    if (selectedSeat) {
      dispatch(
        addToCart({
          flightId: flight.id,
          seat: {
            row: selectedSeat.row,
            seat: selectedSeat.seat,
            isOccupied: selectedSeat.isOccupied,
          },
          price: flight.price,
          flightDetails: flight,
        })
      );
      setSelectedSeat(null);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 1,
          mb: 3,
        }}
      >
        {seats.map((row) =>
          row.map((seat) => (
            <Button
              key={`${seat.row}-${seat.seat}`}
              variant={
                selectedSeat?.row === seat.row &&
                selectedSeat?.seat === seat.seat
                  ? "contained"
                  : "outlined"
              }
              color={seat.isOccupied ? "error" : "primary"}
              disabled={seat.isOccupied}
              onClick={() => handleSeatClick(seat)}
              sx={{ minWidth: "40px", height: "40px" }}
            >
              {seat.row}
              {seat.seat}
            </Button>
          ))
        )}
      </Box>

      {selectedSeat && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Вибране місце: {selectedSeat.row}
            {selectedSeat.seat}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            fullWidth
          >
            Додати до кошика
          </Button>
        </Box>
      )}
    </Box>
  );
};
