import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import type { Flight } from "../types";
import { flightsApi } from "../api/flightsApi";
import { SeatGrid } from "../components/SeatGrid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export const FlightDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Генерація сітки місць
  const generateSeats = () => {
    const rows = 10;
    const seatsPerRow = 6;
    const seatLetters = ["A", "B", "C", "D", "E", "F"];

    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
        row: rowIndex + 1,
        seat: seatLetters[seatIndex],
        isOccupied: Math.random() > 0.7, // 30% шанс що місце зайняте
      }))
    );
  };

  const [seats] = useState(generateSeats());

  useEffect(() => {
    const fetchFlight = async () => {
      if (!id) return;

      try {
        const data = await flightsApi.getFlightById(id);
        setFlight(data);
        setError(null);
      } catch (err) {
        setError("Помилка при завантаженні даних рейсу");
        console.error("Error fetching flight:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !flight) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error || "Рейс не знайдено"}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/flights")}
          sx={{ mt: 2 }}
        >
          Повернутися до списку рейсів
        </Button>
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

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <FlightTakeoffIcon color="primary" fontSize="large" />
          <Typography variant="h4" component="h1">
            {flight.airline}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon color="action" />
            <Typography variant="h6">
              {flight.from} → {flight.to}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon color="action" />
            <Typography>
              Відправлення: {new Date(flight.departureTime).toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon color="action" />
            <Typography>
              Прибуття: {new Date(flight.arrivalTime).toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ConfirmationNumberIcon color="action" />
            <Typography>
              Термінал: {flight.terminal}, Ворота: {flight.gate}
            </Typography>
          </Box>

          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            Ціна: {flight.price} грн
          </Typography>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Виберіть місце
      </Typography>

      <SeatGrid flight={flight} seats={seats} />
    </Box>
  );
};
