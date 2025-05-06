import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { fetchFlights } from "../redux/flightsSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { FlightCard } from "../components/FlightCard";
import { FlightFilters } from "../components/FlightFilters";

export const FlightsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { flights, loading, error } = useSelector(
    (state: RootState) => state.flights
  );

  const [filters, setFilters] = useState({
    search: "",
    sortBy: "price-asc",
    priceRange: "all",
    airline: "all",
  });

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filteredFlights = flights.filter((flight) => {
    // Фільтрація за пошуком
    const searchLower = filters.search.toLowerCase();
    const matchesSearch =
      !filters.search ||
      flight.airline.toLowerCase().includes(searchLower) ||
      flight.from.toLowerCase().includes(searchLower) ||
      flight.to.toLowerCase().includes(searchLower);

    // Фільтрація за авіакомпанією
    const matchesAirline =
      filters.airline === "all" || flight.airline === filters.airline;

    // Фільтрація за ціновим діапазоном
    const prices = flights.map((f) => f.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    let matchesPriceRange = true;

    switch (filters.priceRange) {
      case "budget":
        matchesPriceRange = flight.price <= minPrice + 500;
        break;
      case "medium":
        matchesPriceRange =
          flight.price > minPrice + 500 && flight.price < maxPrice - 500;
        break;
      case "premium":
        matchesPriceRange = flight.price >= maxPrice - 500;
        break;
    }

    return matchesSearch && matchesAirline && matchesPriceRange;
  });

  // Сортування рейсів
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "time-asc":
        return (
          new Date(a.departureTime).getTime() -
          new Date(b.departureTime).getTime()
        );
      case "time-desc":
        return (
          new Date(b.departureTime).getTime() -
          new Date(a.departureTime).getTime()
        );
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Доступні рейси
      </Typography>

      <FlightFilters
        flights={flights}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {sortedFlights.length === 0 ? (
        <Alert severity="info">Рейсів не знайдено</Alert>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {sortedFlights.map((flight) => (
            <Box key={flight.id}>
              <FlightCard flight={flight} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
