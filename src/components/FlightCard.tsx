import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import type { Flight } from "../types";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
      onClick={() => navigate(`/flights/${flight.id}`)}
    >
      <CardContent>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <FlightTakeoffIcon color="primary" />
              <Typography variant="h6" component="div">
                {flight.airline}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <LocationOnIcon color="action" fontSize="small" />
              <Typography color="text.secondary">
                {flight.from} → {flight.to}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <AccessTimeIcon color="action" fontSize="small" />
              <Typography variant="body2">
                Відправлення: {new Date(flight.departureTime).toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <AccessTimeIcon color="action" fontSize="small" />
              <Typography variant="body2">
                Прибуття: {new Date(flight.arrivalTime).toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <ConfirmationNumberIcon color="action" fontSize="small" />
              <Typography variant="body2">
                Термінал: {flight.terminal}, Ворота: {flight.gate}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Chip
                label={`${flight.price} грн`}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`Місць: ${flight.remainingSeats}/${flight.totalSeats}`}
                color={flight.remainingSeats > 0 ? "success" : "error"}
                variant="outlined"
              />
            </Box>
          </Box>

          <Box>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/flights/${flight.id}`);
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <InfoIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
