"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

interface SalesData {
  _id: string;
  sales: number;
  profit: number;
  quantity: number;
}

interface SalesTrendChartProps {
  data: SalesData[];
}

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Sales Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value?.toLocaleString()}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              name="Sales"
              dot={{ fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              name="Profit"
              dot={{ fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
