import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppBar } from "./components/AppBar";
import { FlightsPage } from "./pages/FlightsPage";
import { FlightDetailsPage } from "./pages/FlightDetailsPage";
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
            {/* Cart route will be added later */}
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
