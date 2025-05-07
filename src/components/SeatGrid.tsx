import { Box, Button } from "@mui/material";
import type { Seat } from "../types";

interface SeatGridProps {
  seats: Seat[];
  onSeatSelect: (seatId: string) => void;
  selectedSeat: string | null;
}

export const SeatGrid: React.FC<SeatGridProps> = ({
  seats,
  onSeatSelect,
  selectedSeat,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 1,
        mb: 3,
      }}
    >
      {seats.map((seat) => (
        <Button
          key={seat.id}
          variant={selectedSeat === seat.id ? "contained" : "outlined"}
          color={seat.isAvailable ? "primary" : "error"}
          disabled={!seat.isAvailable}
          onClick={() => seat.isAvailable && onSeatSelect(seat.id)}
          sx={{ minWidth: "40px", height: "40px" }}
        >
          {seat.number}
        </Button>
      ))}
    </Box>
  );
};
