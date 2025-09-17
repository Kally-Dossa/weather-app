import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const TemperatureChart = ({ hourlyData }) => {
  const [hoursToShow, setHoursToShow] = useState(24);

  const chartData = hourlyData.slice(0, hoursToShow).map((temp, index) => {
    const hour = index % 24;
    const hourLabel = hour.toString().padStart(2, "0") + ":00";
    return {
      hour: hourLabel,
      temperature: temp,
    };
  });

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel>Hours</InputLabel>
        <Select
          value={hoursToShow}
          label="Hours"
          onChange={(e) => setHoursToShow(e.target.value)}
        >
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={24}>24</MenuItem>
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#0288D1"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TemperatureChart;
