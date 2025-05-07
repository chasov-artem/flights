import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Alert,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Divider,
} from "@mui/material";
import {
  Delete,
  ArrowBack,
  FlightTakeoff,
  FlightLand,
  EventSeat,
  DeleteSweep,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { Notification } from "../components/Notification";

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    flightId: string;
    seatId: string;
  } | null>(null);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleBackClick = () => {
    navigate("/");
  };

  const handleDeleteClick = (flightId: string, seatId: string) => {
    setItemToDelete({ flightId, seatId });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete));
      setNotification({
        open: true,
        message: "Квиток видалено з корзини",
        severity: "success",
      });
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteAllClick = () => {
    setDeleteAllDialogOpen(true);
  };

  const handleDeleteAllConfirm = () => {
    dispatch(clearCart());
    setNotification({
      open: true,
      message: "Всі квитки видалено з корзини",
      severity: "success",
    });
    setDeleteAllDialogOpen(false);
  };

  const handleDeleteAllCancel = () => {
    setDeleteAllDialogOpen(false);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBackClick}
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
        startIcon={<ArrowBack />}
        onClick={handleBackClick}
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
                <Tooltip title="Видалити з корзини">
                  <IconButton
                    color="error"
                    onClick={() =>
                      handleDeleteClick(item.flightId, item.seatId)
                    }
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
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

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="error"
          size="large"
          startIcon={<DeleteSweep />}
          onClick={handleDeleteAllClick}
        >
          Видалити все
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            setNotification({
              open: true,
              message:
                "Вибачте, сервіс тимчасово не працює. Спробуйте пізніше.",
              severity: "info",
            });
          }}
        >
          Оформити замовлення
        </Button>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Підтвердження видалення
        </DialogTitle>
        <DialogContent>
          <Typography>
            Ви впевнені, що хочете видалити цей квиток з корзини?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Скасувати</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Видалити
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteAllDialogOpen}
        onClose={handleDeleteAllCancel}
        aria-labelledby="delete-all-dialog-title"
      >
        <DialogTitle id="delete-all-dialog-title">
          Підтвердження видалення всіх квитків
        </DialogTitle>
        <DialogContent>
          <Typography>
            Ви впевнені, що хочете видалити всі квитки з корзини?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAllCancel}>Скасувати</Button>
          <Button onClick={handleDeleteAllConfirm} color="error" autoFocus>
            Видалити все
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Container>
  );
};
