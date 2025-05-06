import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import type { RootState } from "../redux/store";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (item: (typeof cartItems)[0]) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <ShoppingCartIcon
          sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          Ваш кошик порожній
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Повернутися до рейсів
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Кошик
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClearCart}
          startIcon={<DeleteIcon />}
        >
          Очистити кошик
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <List>
          {cartItems.map((item, index) => (
            <Box
              key={`${item.flightId}-${item.seat.row}-${item.seat.seat}-${index}`}
            >
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="h6">
                        {item.flightDetails.airline}
                      </Typography>
                      <Typography variant="body1">
                        {item.flightDetails.from} → {item.flightDetails.to}
                      </Typography>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: "div" }}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        Рейс: {item.flightDetails.id}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        Місце: {item.seat.row}-{item.seat.seat}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        Ціна: {item.price} грн
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < cartItems.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Загальна сума: {totalPrice} грн</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            // Тут буде логіка оформлення замовлення
            alert("Функція оформлення замовлення буде додана пізніше");
          }}
        >
          Оформити замовлення
        </Button>
      </Box>
    </Box>
  );
};
