import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { RootState } from "../types";
import { removeFromCart, clearCart } from "../redux/cartSlice";

export const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.flightDetails.price,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/flights")}
          sx={{ mb: 3 }}
        >
          Повернутися до списку рейсів
        </Button>

        <Paper sx={{ p: 3, textAlign: "center" }}>
          <ShoppingCartIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Ваш кошик порожній
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Додайте квитки до кошика, щоб продовжити покупку
          </Typography>
          <Button variant="contained" onClick={() => navigate("/flights")}>
            Перейти до списку рейсів
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/flights")}
        sx={{ mb: 3 }}
      >
        Повернутися до списку рейсів
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <ShoppingCartIcon color="primary" fontSize="large" />
          <Typography variant="h4" component="h1">
            Кошик
          </Typography>
        </Box>

        <List>
          {cartItems.map((item, index) => (
            <Box
              key={`${item.flightDetails.id}-${item.seat.row}-${item.seat.seat}`}
            >
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      {item.flightDetails.airline}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body1">
                        {item.flightDetails.from} → {item.flightDetails.to}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ряд {item.seat.row}, Місце {item.seat.seat}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary"
                        sx={{ mt: 1 }}
                      >
                        {item.flightDetails.price} грн
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < cartItems.length - 1 && <Divider />}
            </Box>
          ))}
        </List>

        <Box
          sx={{ mt: 3, p: 2, bgcolor: "background.default", borderRadius: 1 }}
        >
          <Typography variant="h6" gutterBottom>
            Загальна сума: {totalPrice} грн
          </Typography>
        </Box>

        <Box
          sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch(clearCart())}
          >
            Очистити кошик
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // TODO: Implement checkout
              alert("Функція оформлення замовлення буде реалізована пізніше");
            }}
          >
            Оформити замовлення
          </Button>
        </Box>
      </Paper>

      <Alert severity="info" sx={{ mt: 2 }}>
        Після оформлення замовлення ви отримаєте підтвердження на вашу
        електронну пошту
      </Alert>
    </Box>
  );
};
