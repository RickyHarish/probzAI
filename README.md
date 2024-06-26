# Chart Report Application

This project is a React-based web application for displaying and exporting chart data using Recharts and HTML-to-Image libraries.

## Features

- **Chart Display**: Utilizes Recharts to display line charts based on fetched JSON data.
- **Timeframe Breakdown**: Allows users to view data on a daily, weekly, or monthly basis.
- **Export as PNG**: Provides functionality to export the chart as a PNG image.
- **Interactive Features**: Click events on data points show detailed information.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/chart-report.git
   cd chart-report
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

3. Use the buttons to switch between daily, weekly, and monthly views of the chart.
   
4. Click on data points in the chart to see detailed information.

5. Click on "Export as PNG" to download the chart as an image.

## Folder Structure
- **`src/`**: Source code directory.
  - **`components/`**: React components.
  - **`App.js`**: Main application component.
  - **`App.css`**: CSS styles for the application.
  - **`data.json`**: Sample JSON data file for chart visualization.

## Dependencies

- [React](https://reactjs.org/)
- [Recharts](https://recharts.org/)
- [html-to-image](https://github.com/bubkoo/html-to-image)
- [downloadjs](https://github.com/rndme/download)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
