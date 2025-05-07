import type { Flight } from "../types";

// Імітація API для роботи з рейсами
export const flightsApi = {
  // Отримання всіх рейсів
  getAllFlights: async (): Promise<Flight[]> => {
    // Імітація затримки мережі
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Приклад даних
    return [
      {
        id: "1",
        airline: "Ukraine International Airlines",
        from: "Київ",
        to: "Львів",
        departureTime: "2024-03-20T10:00:00",
        arrivalTime: "2024-03-20T11:30:00",
        terminal: "D",
        gate: "12",
        price: 2500,
        totalSeats: 180,
        remainingSeats: 150,
        seats: Array.from({ length: 180 }, (_, i) => ({
          id: `${i + 1}`,
          number: `${i + 1}`,
          isAvailable: i < 150,
        })),
      },
      {
        id: "2",
        airline: "Windrose",
        from: "Київ",
        to: "Одеса",
        departureTime: "2024-03-20T14:00:00",
        arrivalTime: "2024-03-20T15:30:00",
        terminal: "B",
        gate: "8",
        price: 2200,
        totalSeats: 150,
        remainingSeats: 120,
        seats: Array.from({ length: 150 }, (_, i) => ({
          id: `${i + 1}`,
          number: `${i + 1}`,
          isAvailable: i < 120,
        })),
      },
      {
        id: "3",
        airline: "SkyUp",
        from: "Київ",
        to: "Харків",
        departureTime: "2024-03-20T16:00:00",
        arrivalTime: "2024-03-20T17:30:00",
        terminal: "A",
        gate: "5",
        price: 2000,
        totalSeats: 180,
        remainingSeats: 100,
        seats: Array.from({ length: 180 }, (_, i) => ({
          id: `${i + 1}`,
          number: `${i + 1}`,
          isAvailable: i < 100,
        })),
      },
    ];
  },

  // Отримання рейсу за ID
  getFlightById: async (id: string): Promise<Flight> => {
    // Імітація затримки мережі
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Отримання всіх рейсів
    const flights = await flightsApi.getAllFlights();

    // Пошук рейсу за ID
    const flight = flights.find((f) => f.id === id);

    if (!flight) {
      throw new Error("Рейс не знайдено");
    }

    return flight;
  },
};
