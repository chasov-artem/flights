import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchFlightById } from "../redux/flightsSlice";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Tooltip,
  Paper,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  ShoppingCart,
  FlightTakeoff,
  AccessTime,
  LocationOn,
} from "@mui/icons-material";
import { Notification } from "../components/Notification";
import type { CartItem } from "../types/cart";

interface Seat {
  id: string;
  number: number;
  status: "free" | "occupied";
}

export const FlightDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedFlight: flight,
    loading,
    error,
  } = useSelector((state: RootState) => state.flights);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchFlightById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (flight) {
      // Створюємо масив всіх місць
      const allSeats = Array.from({ length: flight.totalSeats }, (_, i) => ({
        id: `seat-${i + 1}`,
        number: i + 1,
        status: "free" as const,
      }));

      // Визначаємо кількість зайнятих місць
      const occupiedSeatsCount = flight.totalSeats - flight.remainingSeats;

      // Створюємо масив індексів для зайнятих місць
      const occupiedIndices = new Set<number>();
      while (occupiedIndices.size < occupiedSeatsCount) {
        const randomIndex = Math.floor(Math.random() * flight.totalSeats);
        occupiedIndices.add(randomIndex);
      }

      // Позначаємо випадкові місця як зайняті
      const seatsWithStatus = allSeats.map((seat, index) => ({
        ...seat,
        status: occupiedIndices.has(index)
          ? ("occupied" as const)
          : ("free" as const),
      }));

      setSeats(seatsWithStatus);
    }
  }, [flight]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSeatClick = (seatId: string) => {
    if (!flight) return;

    const isInCart = cartItems.some(
      (item: CartItem) => item.flightId === flight.id && item.seatId === seatId
    );

    if (isInCart) {
      dispatch(removeFromCart({ flightId: flight.id, seatId }));
      setNotification({
        open: true,
        message: "Квиток видалено з корзини",
        severity: "success",
      });
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, seatId]);
    }
  };

  const handleAddToCart = () => {
    if (selectedSeats.length === 0) {
      setNotification({
        open: true,
        message: "Будь ласка, оберіть хоча б одне місце",
        severity: "warning",
      });
      return;
    }

    if (!flight) return;

    selectedSeats.forEach((seatId) => {
      dispatch(
        addToCart({
          flightId: flight.id,
          seatId: seatId,
          price: flight.price,
          airline: flight.airline,
          from: flight.from,
          to: flight.to,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
        })
      );
    });

    setNotification({
      open: true,
      message: "Квитки додано до корзини",
      severity: "success",
    });

    navigate("/cart");
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
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
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={handleBackClick}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Назад до списку рейсів
      </Button>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <FlightTakeoff color="primary" />
              <Typography variant="h5" component="h1">
                {flight.airline}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LocationOn color="action" />
              <Typography variant="h6" color="text.secondary">
                {flight.from} → {flight.to}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <AccessTime color="action" />
              <Typography variant="body1">
                Відправлення: {new Date(flight.departureTime).toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <AccessTime color="action" />
              <Typography variant="body1">
                Прибуття: {new Date(flight.arrivalTime).toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Інформація про рейс
              </Typography>
              <Typography variant="body1" gutterBottom>
                Термінал: {flight.terminal}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Ворота: {flight.gate}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Ціна: {flight.price} грн
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Доступні місця: {flight.remainingSeats} з {flight.totalSeats}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Виберіть місце
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Легенда:
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  border: "1px solid",
                  borderColor: "success.main",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Typography variant="body2">Вільне місце</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "grey.300",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Typography variant="body2">Зайняте місце</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "primary.main",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              />
              <Typography variant="body2">Вибране місце</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {Array.from(
            { length: Math.ceil(flight.totalSeats / 6) },
            (_, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                {seats.slice(rowIndex * 6, (rowIndex + 1) * 6).map((seat) => (
                  <Tooltip
                    key={seat.id}
                    title={
                      seat.status === "free"
                        ? "Доступне місце"
                        : "Місце зайняте"
                    }
                  >
                    <Box
                      onClick={() =>
                        seat.status === "free" && handleSeatClick(seat.id)
                      }
                      sx={{
                        width: 50,
                        height: 50,
                        border: "1px solid",
                        borderColor:
                          seat.status === "free" ? "success.main" : "grey.400",
                        bgcolor:
                          seat.status === "free"
                            ? selectedSeats.includes(seat.id)
                              ? "primary.main"
                              : "transparent"
                            : "grey.300",
                        color:
                          seat.status === "free"
                            ? selectedSeats.includes(seat.id)
                              ? "white"
                              : "text.primary"
                            : "text.secondary",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor:
                          seat.status === "free" ? "pointer" : "not-allowed",
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor:
                            seat.status === "free"
                              ? selectedSeats.includes(seat.id)
                                ? "primary.dark"
                                : "success.light"
                              : "grey.300",
                        },
                      }}
                    >
                      <Typography variant="body1" fontWeight="medium">
                        {seat.number}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            )
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            disabled={selectedSeats.length === 0}
            sx={{ px: 4, py: 1.5 }}
          >
            Додати в корзину
          </Button>
        </Box>
      </Paper>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Container>
  );
};
