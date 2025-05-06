import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import type { Flight } from "../types";
import { flightsApi } from "../api/flightsApi";
import { SeatGrid } from "../components/SeatGrid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const FlightDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Генерація сітки місць
  const generateSeats = (): {
    row: number;
    seat: string;
    isOccupied: boolean;
  }[][] => {
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
        setError("Помилка при завантаженні деталей рейсу");
        console.error("Error fetching flight:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !flight) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error || "Рейс не знайдено"}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Назад
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Рейс {flight.airline}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Інформація про рейс
          </Typography>
          <Typography>З: {flight.from}</Typography>
          <Typography>До: {flight.to}</Typography>
          <Typography>
            Відправлення: {new Date(flight.departureTime).toLocaleString()}
          </Typography>
          <Typography>
            Прибуття: {new Date(flight.arrivalTime).toLocaleString()}
          </Typography>
          <Typography>Термінал: {flight.terminal}</Typography>
          <Typography>Ворота: {flight.gate}</Typography>
          <Typography>Ціна: {flight.price} грн</Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Вибір місця
          </Typography>
          <SeatGrid seats={seats} flight={flight} />
        </Box>
      </Box>
    </Container>
  );
};
