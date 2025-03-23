import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "./App.css";

interface MilkPriceData {
  date: Date;
  price: number;
}

function App() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/APU0000709112.csv");
        const text = await response.text();

        // Parse CSV data more robustly
        const rows = text.split("\n");
        const header = rows[0].split(",");

        // Format data for Google Charts
        const formattedData: any[] = [["Date", "Price per Gallon"]];

        // Skip header row
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].trim();
          if (row === "") continue;

          const values = row.split(",");
          if (values.length >= 2) {
            try {
              const dateStr = values[0].trim();
              const priceStr = values[1].trim();

              const date = new Date(dateStr);
              const price = parseFloat(priceStr);

              if (!isNaN(date.getTime()) && !isNaN(price)) {
                formattedData.push([date, price]);
              }
            } catch (err) {
              console.warn(`Skipping invalid row: ${row}`);
            }
          }
        }

        if (formattedData.length <= 1) {
          throw new Error("No valid data found in CSV");
        }

        setChartData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(
          "Error loading data: " +
            (err instanceof Error ? err.message : String(err))
        );
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const options = {
    title:
      "Average Price: Milk, Fresh, Whole, Fortified (Cost per Gallon/3.8 Liters) in U.S. City Average",
    titleTextStyle: {
      fontSize: 16,
    },
    hAxis: {
      title: "Date",
      format: "MMM yyyy",
    },
    vAxis: {
      title: "Price (USD)",
      format: "$#.##",
    },
    legend: { position: "none" },
    lineWidth: 3,
    colors: ["#0288D1"],
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
    pointSize: 0,
    explorer: {
      actions: ["dragToZoom", "rightClickToReset"],
      axis: "horizontal",
      keepInBounds: true,
      maxZoomIn: 4.0,
    },
    chartArea: {
      width: "80%",
      height: "70%",
    },
    backgroundColor: {
      fill: "#f9f9f9",
    },
  };

  return (
    <div className="App">
      <h1>Milk Price Trends</h1>
      <div className="chart-container">
        {loading && <p>Loading data...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && chartData.length > 0 && (
          <Chart
            chartType="LineChart"
            width="100%"
            height="500px"
            data={chartData}
            options={options}
            loader={<div>Loading Chart...</div>}
          />
        )}
      </div>
      <div className="source">
        <p>Source: Federal Reserve Bank of St. Louis Economic Data (FRED)</p>
        <p>Series ID: APU0000709112</p>
      </div>
    </div>
  );
}

export default App;
