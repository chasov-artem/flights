# Flights Booking Application

A modern single-page application for browsing and booking flight tickets, built with React, TypeScript, and Material-UI.

## Features

- 🛫 Browse available flights with detailed information
- 🔍 Filter and sort flights by various criteria
- 💺 Interactive seat selection with visual status indicators
- 🛒 Shopping cart functionality with persistent storage
- ❤️ Favorites system for saving preferred flights
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **UI Library:** Material-UI (MUI)
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **HTTP Client:** Axios
- **Icons:** Material Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/chasov-artem/flights.git
cd flights
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── redux/         # Redux store and slices
├── types/         # TypeScript type definitions
├── api/           # API integration
└── utils/         # Utility functions
```

## API Integration

The application uses the following endpoints:

- `GET https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights` - Get all flights
- `GET https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights/${id}` - Get flight details

## Features in Detail

### Flight Browsing

- View flights in a card layout
- Filter flights by airline, city, or date
- Sort flights by price or time
- Add flights to favorites

### Seat Selection

- Interactive seat grid
- Visual indicators for available and occupied seats
- Real-time seat status updates
- Multiple seat selection support

### Shopping Cart

- Add/remove tickets
- Persistent cart data using localStorage
- Total price calculation
- Bulk delete functionality

## Contributing

Feel free to submit issues and enhancement requests!

## Author

**Artem Chasov**

- GitHub: [@chasov-artem](https://github.com/chasov-artem)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
