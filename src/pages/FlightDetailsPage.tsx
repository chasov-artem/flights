import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import {
  FlightTakeoff,
  FlightLand,
  AccessTime,
  LocationOn,
  ConfirmationNumber,
  ArrowBack,
  ShoppingCart,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { fetchFlightById } from "../redux/flightsSlice";

type SeatStatus = "free" | "occupied" | "selected";

interface Seat {
  id: string;
  status: SeatStatus;
}

export const FlightDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const {
    selectedFlight: flight,
    loading,
    error,
  } = useSelector((state: RootState) => state.flights);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (id) {
      dispatch(fetchFlightById(id))
        .unwrap()
        .then((flight) => {
          if (flight) {
            generateSeats(flight.totalSeats, flight.remainingSeats);
          }
        })
        .catch(() => {});
    }
  }, [dispatch, id]);

  const generateSeats = (totalSeats: number, remainingSeats: number) => {
    const seatsArray: Seat[] = [];
    const occupiedCount = totalSeats - remainingSeats;

    const occupiedIndices = new Set<number>();
    while (occupiedIndices.size < occupiedCount) {
      const randomIndex = Math.floor(Math.random() * totalSeats);
      occupiedIndices.add(randomIndex);
    }

    for (let i = 0; i < totalSeats; i++) {
      seatsArray.push({
        id: `seat-${i + 1}`,
        status: occupiedIndices.has(i) ? "occupied" : "free",
      });
    }

    setSeats(seatsArray);
  };

  const handleSeatClick = (seatId: string) => {
    if (!flight) return;

    const seatIndex = seats.findIndex((seat) => seat.id === seatId);
    if (seatIndex === -1) return;

    const seat = seats[seatIndex];
    if (seat.status === "occupied") return;

    const isInCart = cartItems.some(
      (item) => item.flightId === flight.id && item.seatId === seatId
    );

    if (isInCart) {
      dispatch(removeFromCart({ flightId: flight.id, seatId }));
      setSeats((prev) =>
        prev.map((s) => (s.id === seatId ? { ...s, status: "free" } : s))
      );
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seatId);
      setSeats((prev) =>
        prev.map((s) => (s.id === seatId ? { ...s, status: "selected" } : s))
      );
    }
  };

  const handleAddToCart = () => {
    if (!flight || !selectedSeat) return;

    dispatch(
      addToCart({
        flightId: flight.id,
        seatId: selectedSeat,
        price: flight.price,
        airline: flight.airline,
        from: flight.from,
        to: flight.to,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
      })
    );
    navigate("/cart");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !flight) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          {error || "Не вдалося завантажити інформацію про рейс"}
        </Alert>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Повернутися до списку рейсів
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{ mb: 2 }}
      >
        Повернутися до списку рейсів
      </Button>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "grid", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              {flight.airline}
            </Typography>
            <Chip
              label={`$${flight.price}`}
              color="primary"
              sx={{ fontSize: "1.2rem", padding: "20px" }}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FlightTakeoff sx={{ mr: 1, color: "primary.main" }} />
              <Box>
                <Typography variant="h6">{flight.from}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(flight.departureTime).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FlightLand sx={{ mr: 1, color: "primary.main" }} />
              <Box>
                <Typography variant="h6">{flight.to}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(flight.arrivalTime).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTime sx={{ mr: 1, color: "primary.main" }} />
              <Box>
                <Typography variant="subtitle1">Тривалість польоту</Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(
                    (new Date(flight.arrivalTime).getTime() -
                      new Date(flight.departureTime).getTime()) /
                      (1000 * 60)
                  )}{" "}
                  хвилин
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOn sx={{ mr: 1, color: "primary.main" }} />
              <Box>
                <Typography variant="subtitle1">Термінал та ворота</Typography>
                <Typography variant="body2" color="text.secondary">
                  Термінал {flight.terminal}, Ворота {flight.gate}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ConfirmationNumber sx={{ mr: 1, color: "primary.main" }} />
              <Box>
                <Typography variant="subtitle1">Доступні місця</Typography>
                <Typography variant="body2" color="text.secondary">
                  {flight.remainingSeats} з {flight.totalSeats}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              Виберіть місце
            </Typography>
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
                  variant={
                    seat.status === "selected"
                      ? "contained"
                      : seat.status === "occupied"
                      ? "outlined"
                      : "outlined"
                  }
                  color={
                    seat.status === "selected"
                      ? "primary"
                      : seat.status === "occupied"
                      ? "error"
                      : "primary"
                  }
                  disabled={seat.status === "occupied"}
                  onClick={() => handleSeatClick(seat.id)}
                  sx={{ minWidth: "40px", height: "40px" }}
                >
                  {seat.id.replace("seat-", "")}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCart />}
              disabled={!selectedSeat}
              onClick={handleAddToCart}
            >
              Додати в корзину
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
