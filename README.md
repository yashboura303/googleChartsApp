# Milk Price Trends Visualization

This project visualizes historical data for the average price of milk in the U.S. using Google Charts.

## Dataset

The visualization uses the Federal Reserve Economic Data (FRED) series:
- **APU0000709112**: Average Price: Milk, Fresh, Whole, Fortified (Cost per Gallon/3.8 Liters) in U.S. City Average

## Features

- Interactive line chart visualization of milk prices from 2013 to 2023
- Responsive design that works on all device sizes
- Interactive features including zoom, hover tooltips, and time period selection
- Clean modern UI

## Technologies Used

- HTML/CSS/JavaScript
- Google Charts API

## Getting Started

### Prerequisites

- Node.js (v14 or later)

### Running the Project

1. Clone the repository
```bash
git clone <repository-url>
cd milk-price-chart
```

2. Start the server
```bash
node server.js
```

3. Open your browser and navigate to `http://localhost:3000`

## Structure

- `public/index.html` - Main HTML file with the chart implementation
- `public/APU0000709112.csv` - Data file with milk prices
- `server.js` - Simple HTTP server to serve static files

## Prompt Engineering for ChatGPT

To recreate this chart in ChatGPT, use the following prompt:

```
Get Average Price: Milk, Fresh, Whole, Fortified (Cost per Gallon/3.8 Liters) in U.S. City Average time series data for the last 10 years in JSON format from FRED.

Then, create a Google Line Chart visualization for this data with the following requirements:
1. Chart title should be "Average Price: Milk, Fresh, Whole, Fortified (Cost per Gallon/3.8 Liters) in U.S. City Average"
2. X-axis should show dates in MMM YYYY format
3. Y-axis should show prices in USD format with $ symbol
4. Chart should have appropriate styling with a blue line
5. Include animations when the chart loads
6. Add zoom functionality
7. Make the chart responsive for all device sizes
8. Include a source citation for the data

Please provide the complete code implementation using HTML, CSS, and JavaScript with the Google Charts API.
```

## License

MIT
"# googleChartsApp" 
