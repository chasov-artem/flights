import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FlightCard } from "../components/FlightCard";
import type { Flight } from "../types";
import { flightsApi } from "../api/flightsApi";

export const FlightsPage = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await flightsApi.getAllFlights();
        setFlights(data);
        setError(null);
      } catch (err) {
        setError("Помилка при завантаженні рейсів");
        console.error("Error fetching flights:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Доступні рейси
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </Box>
    </Container>
  );
};
