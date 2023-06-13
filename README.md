# F1 Racing Results

This project is a web application that displays yearly rankings of Formula 1 drivers. It fetches data from the Ergast API and presents the information in a chart format.

## Implemented Contents

- **YearlyRankingChart**: This component retrieves and displays the yearly rankings of Formula 1 drivers. It fetches data from the Ergast API and renders the rankings in a chart format.

## How to Run

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the project dependencies by running the command `npm install` in the project directory.
3. Start the development server by running the command `npm start`.
4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Dependencies

The project utilizes the following dependencies:

- React: JavaScript library for building user interfaces.
- axios: Promise-based HTTP client for making API requests.
- react-chartjs-2: React wrapper for Chart.js library, used for chart visualization.

To install these dependencies, run `npm install` in the project directory.

## API Usage

The project fetches data from the Ergast API to retrieve the yearly rankings of Formula 1 drivers. The API endpoint used is `https://ergast.com/api/f1/driverStandings/1.json`.

## Future Enhancements

- Improve error handling and display meaningful error messages to the user.
- Implement pagination or infinite scrolling for large datasets.
- Add more visualizations and filters for the racing results.

Feel free to contribute to the project by submitting pull requests or suggesting new features.

