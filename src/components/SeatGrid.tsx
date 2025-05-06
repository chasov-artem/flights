import { Grid, IconButton, Typography } from "@mui/material";
import { Seat } from "../types";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Flight } from "../types";

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
          seat,
          price: flight.price,
          flightDetails: flight,
        })
      );
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h6" align="center" gutterBottom>
          Схема місць
        </Typography>
      </Grid>
      {seats.map((row, rowIndex) => (
        <Grid item xs={12} key={rowIndex}>
          <Grid container spacing={1} justifyContent="center">
            {row.map((seat, seatIndex) => (
              <Grid item key={`${rowIndex}-${seatIndex}`}>
                <IconButton
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.isOccupied}
                  sx={{
                    color: seat.isOccupied ? "error.main" : "success.main",
                    "&:hover": {
                      backgroundColor: seat.isOccupied
                        ? "error.light"
                        : "success.light",
                    },
                  }}
                >
                  <EventSeatIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
