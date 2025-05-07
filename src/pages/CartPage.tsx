import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  FlightTakeoff,
  FlightLand,
  EventSeat,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { removeFromCart } from "../redux/cartSlice";

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (flightId: string, seatId: string) => {
    dispatch(removeFromCart({ flightId, seatId }));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 2 }}
        >
          Повернутися до списку рейсів
        </Button>
        <Alert severity="info">Ваша корзина порожня</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 2 }}
      >
        Повернутися до списку рейсів
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Корзина
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        {cartItems.map((item) => (
          <Paper key={`${item.flightId}-${item.seatId}`} sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.airline}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FlightTakeoff sx={{ mr: 1, color: "primary.main" }} />
                  <Typography>
                    {item.from} -{" "}
                    {new Date(item.departureTime).toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FlightLand sx={{ mr: 1, color: "primary.main" }} />
                  <Typography>
                    {item.to} - {new Date(item.arrivalTime).toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EventSeat sx={{ mr: 1, color: "primary.main" }} />
                  <Typography>Місце: {item.seatId}</Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                <Typography variant="h6" color="primary">
                  ${item.price}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() =>
                    handleRemoveFromCart(item.flightId, item.seatId)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Загальна сума:</Typography>
        <Typography variant="h5" color="primary">
          ${totalAmount}
        </Typography>
      </Box>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            // Тут можна додати логіку оформлення замовлення
            alert("Замовлення оформлено!");
          }}
        >
          Оформити замовлення
        </Button>
      </Box>
    </Container>
  );
};
