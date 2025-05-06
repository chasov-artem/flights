import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import type { Flight } from "../types";

interface Seat {
  row: number;
  seat: string;
  isOccupied: boolean;
}

interface SeatGridProps {
  seats: Seat[][];
  flight: Flight;
}

export const SeatGrid: React.FC<SeatGridProps> = ({ seats, flight }) => {
  const dispatch = useDispatch();

  const handleSeatClick = (seat: Seat) => {
    if (!seat.isOccupied) {
      dispatch(
        addToCart({
          flightId: flight.id,
          seat: {
            row: seat.row,
            seat: seat.seat,
            isOccupied: seat.isOccupied,
          },
          price: flight.price,
          flightDetails: flight,
        })
      );
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {seats.map((row, rowIndex) => (
        <Box key={rowIndex} sx={{ display: "flex", gap: 1 }}>
          {row.map((seat) => (
            <Button
              key={`${rowIndex}-${seat.seat}`}
              variant={seat.isOccupied ? "contained" : "outlined"}
              color={seat.isOccupied ? "error" : "primary"}
              disabled={seat.isOccupied}
              onClick={() => handleSeatClick(seat)}
              sx={{ minWidth: "40px", height: "40px" }}
            >
              {seat.seat}
            </Button>
          ))}
        </Box>
      ))}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Легенда:
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: "20px",
                height: "20px",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "4px",
              }}
            />
            <Typography variant="body2">Вільне</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: "20px",
                height: "20px",
                bgcolor: "error.main",
                borderRadius: "4px",
              }}
            />
            <Typography variant="body2">Зайняте</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
