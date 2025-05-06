import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppBar } from "./components/AppBar";
import { FlightsPage } from "./pages/FlightsPage";
import { FlightDetailsPage } from "./pages/FlightDetailsPage";
import { CartPage } from "./pages/CartPage";
import { PageTransition } from "./components/PageTransition";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppBar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <FlightsPage />
                </PageTransition>
              }
            />
            <Route
              path="/flights/:id"
              element={
                <PageTransition>
                  <FlightDetailsPage />
                </PageTransition>
              }
            />
            <Route
              path="/cart"
              element={
                <PageTransition>
                  <CartPage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </Router>
    </Provider>
  );
}

export default App;
