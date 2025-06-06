import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../redux/flightsSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { Notification } from "../components/Notification";

type SortOption = "price-asc" | "price-desc" | "time-asc" | "time-desc";

export const FlightsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { flights, loading, error } = useSelector(
    (state: RootState) => state.flights
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFlightClick = (id: string) => {
    navigate(`/flights/${id}`);
  };

  const toggleFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = prev.includes(id)
        ? prev.filter((favoriteId) => favoriteId !== id)
        : [...prev, id];

      setNotification({
        open: true,
        message: prev.includes(id)
          ? "Рейс видалено з обраного"
          : "Рейс додано до обраного",
        severity: "success",
      });

      return newFavorites;
    });
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const filteredAndSortedFlights = flights
    .filter((flight) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        flight.airline.toLowerCase().includes(searchLower) ||
        flight.from.toLowerCase().includes(searchLower) ||
        flight.to.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "time-asc":
          return (
            new Date(a.departureTime).getTime() -
            new Date(b.departureTime).getTime()
          );
        case "time-desc":
          return (
            new Date(b.departureTime).getTime() -
            new Date(a.departureTime).getTime()
          );
        default:
          return 0;
      }
    });

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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Пошук рейсів"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Введіть авіакомпанію, місто відправлення або прибуття"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                select
                label="Сортування"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <MenuItem value="price-asc">Ціна (за зростанням)</MenuItem>
                <MenuItem value="price-desc">Ціна (за спаданням)</MenuItem>
                <MenuItem value="time-asc">Час (за зростанням)</MenuItem>
                <MenuItem value="time-desc">Час (за спаданням)</MenuItem>
              </TextField>
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart />}
          onClick={handleCartClick}
          sx={{ ml: 2 }}
        >
          Корзина ({cartItems.length})
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {filteredAndSortedFlights.map((flight) => (
          <Box
            key={flight.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(33.33% - 16px)",
              },
            }}
          >
            <Card
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
              onClick={() => handleFlightClick(flight.id)}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" component="div">
                    {flight.airline}
                  </Typography>
                  <Tooltip
                    title={
                      favorites.includes(flight.id)
                        ? "Видалити з обраного"
                        : "Додати до обраного"
                    }
                  >
                    <IconButton
                      onClick={(e) => toggleFavorite(flight.id, e)}
                      color="primary"
                    >
                      {favorites.includes(flight.id) ? (
                        <Favorite />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>

                <Typography variant="body1" gutterBottom>
                  {flight.from} → {flight.to}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Відправлення:{" "}
                    {new Date(flight.departureTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Прибуття: {new Date(flight.arrivalTime).toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Ціна: ${flight.price}</Typography>
                  <Typography variant="body2">
                    Доступні місця: {flight.remainingSeats} з{" "}
                    {flight.totalSeats}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Container>
  );
};
