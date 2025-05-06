import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

export const AppBar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <MuiAppBar position="sticky" sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              mr: 4,
            }}
            onClick={() => navigate("/")}
          >
            <FlightTakeoffIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: ".1rem",
              }}
            >
              АВІАКВИТКИ
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => navigate("/")}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Рейси
            </Button>
          </Box>

          <Button
            color="inherit"
            onClick={() => navigate("/cart")}
            startIcon={
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            }
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Корзина
          </Button>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
