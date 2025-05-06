import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { Flight } from "../types";

interface FlightFiltersProps {
  flights: Flight[];
  filters: {
    search: string;
    sortBy: string;
    priceRange: string;
    airline: string;
  };
  onFilterChange: (filters: {
    search: string;
    sortBy: string;
    priceRange: string;
    airline: string;
  }) => void;
}

export const FlightFilters: React.FC<FlightFiltersProps> = ({
  flights,
  filters,
  onFilterChange,
}) => {
  // Отримуємо унікальні авіакомпанії
  const airlines = Array.from(
    new Set(flights.map((flight) => flight.airline))
  ).sort();

  // Отримуємо мінімальну та максимальну ціну
  const prices = flights.map((flight) => flight.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: event.target.value });
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    onFilterChange({ ...filters, sortBy: event.target.value });
  };

  const handlePriceRangeChange = (event: SelectChangeEvent) => {
    onFilterChange({ ...filters, priceRange: event.target.value });
  };

  const handleAirlineChange = (event: SelectChangeEvent) => {
    onFilterChange({ ...filters, airline: event.target.value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        mb: 4,
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <TextField
        label="Пошук"
        variant="outlined"
        value={filters.search}
        onChange={handleSearchChange}
        placeholder="Пошук за містом або авіакомпанією"
        sx={{ flex: 1 }}
      />

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Сортування</InputLabel>
        <Select
          value={filters.sortBy}
          label="Сортування"
          onChange={handleSortChange}
        >
          <MenuItem value="price-asc">Ціна (за зростанням)</MenuItem>
          <MenuItem value="price-desc">Ціна (за спаданням)</MenuItem>
          <MenuItem value="time-asc">Час (за зростанням)</MenuItem>
          <MenuItem value="time-desc">Час (за спаданням)</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Ціновий діапазон</InputLabel>
        <Select
          value={filters.priceRange}
          label="Ціновий діапазон"
          onChange={handlePriceRangeChange}
        >
          <MenuItem value="all">Всі ціни</MenuItem>
          <MenuItem value="budget">{`До ${minPrice + 500} грн`}</MenuItem>
          <MenuItem value="medium">{`${minPrice + 500} - ${
            maxPrice - 500
          } грн`}</MenuItem>
          <MenuItem value="premium">{`Від ${maxPrice - 500} грн`}</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Авіакомпанія</InputLabel>
        <Select
          value={filters.airline}
          label="Авіакомпанія"
          onChange={handleAirlineChange}
        >
          <MenuItem value="all">Всі авіакомпанії</MenuItem>
          {airlines.map((airline) => (
            <MenuItem key={airline} value={airline}>
              {airline}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
