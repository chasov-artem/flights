import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppBar } from "./components/AppBar";
import { FlightsPage } from "./pages/FlightsPage";
import { FlightDetailsPage } from "./pages/FlightDetailsPage";
import { CartPage } from "./pages/CartPage";
import { CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <AppBar />
        <Container>
          <Routes>
            <Route path="/" element={<FlightsPage />} />
            <Route path="/flights/:id" element={<FlightDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
