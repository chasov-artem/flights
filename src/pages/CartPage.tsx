import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { RootState } from "../types";
import { removeFromCart, clearCart } from "../redux/cartSlice";

export const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (flightId: string, row: number, seat: string) => {
    dispatch(removeFromCart(`${flightId}-${row}-${seat}`));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Корзина порожня
        </Typography>
        <Typography color="text.secondary">
          Додайте квитки, щоб вони з'явились у корзині
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Корзина
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {cartItems.map((item) => (
          <Card key={`${item.flightId}-${item.seat.row}-${item.seat.seat}`}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6">
                    {item.flightDetails.airline}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.flightDetails.from} → {item.flightDetails.to}
                  </Typography>
                  <Typography>
                    Місце: {item.seat.row} ряд, {item.seat.seat}
                  </Typography>
                  <Typography>Ціна: {item.price} грн</Typography>
                </Box>
                <IconButton
                  color="error"
                  onClick={() =>
                    handleRemoveItem(
                      item.flightId,
                      item.seat.row,
                      item.seat.seat
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
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
        <Typography variant="h6">Загальна сума: {totalPrice} грн</Typography>
        <Button variant="outlined" color="error" onClick={handleClearCart}>
          Очистити корзину
        </Button>
      </Box>
    </Container>
  );
};
