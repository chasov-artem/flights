import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Paper, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { fetchFlightById } from "../redux/flightsSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { SeatGrid } from "../components/SeatGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const FlightDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedFlight: flight,
    loading,
    error,
  } = useSelector((state: RootState) => state.flights);

  useEffect(() => {
    if (id) {
      dispatch(fetchFlightById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSpinner message="Завантаження інформації про рейс..." />;
  }

  if (error || !flight) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || "Рейс не знайдено"}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
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
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        Повернутися до списку рейсів
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <FlightTakeoffIcon color="primary" fontSize="large" />
          <Typography variant="h4" component="h1">
            {flight.airline}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon color="primary" />
            <Typography variant="h6">
              {flight.from} → {flight.to}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon color="primary" />
            <Typography>
              Відправлення: {new Date(flight.departureTime).toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ConfirmationNumberIcon color="primary" />
            <Typography>
              Термінал: {flight.terminal}, Ворота: {flight.gate}
            </Typography>
          </Box>

          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            Ціна: {flight.price} грн
          </Typography>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Виберіть місце
      </Typography>

      <SeatGrid flight={flight} />
    </Box>
  );
};
