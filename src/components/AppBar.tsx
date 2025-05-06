import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const AppBar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Авіаквитки
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Рейси
        </Button>
        <Button
          color="inherit"
          onClick={() => navigate("/cart")}
          startIcon={
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          }
        >
          Корзина
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
};
