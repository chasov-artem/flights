import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import { Flight } from "../types";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
      }}
      onClick={() => navigate(`/flights/${flight.id}`)}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Typography variant="h6" component="div">
              {flight.airline}
            </Typography>
            <Typography color="text.secondary">
              {flight.from} → {flight.to}
            </Typography>
            <Typography variant="body2">
              Відправлення: {new Date(flight.departureTime).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Прибуття: {new Date(flight.arrivalTime).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Термінал: {flight.terminal}, Ворота: {flight.gate}
            </Typography>
            <Typography variant="body2">Ціна: {flight.price} грн</Typography>
            <Typography variant="body2">
              Місць: {flight.remainingSeats}/{flight.totalSeats}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/flights/${flight.id}`);
              }}
            >
              <InfoIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
