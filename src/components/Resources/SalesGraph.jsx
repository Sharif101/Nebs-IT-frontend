import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesGraph({ data }) {
  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg shadow-sm mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tickFormatter={(tick) => tick.slice(5)} />
          <YAxis />
          <Tooltip formatter={(value) => `৳ ${value}`} />
          <Line type="monotone" dataKey="totalSale" stroke="#2563EB" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
