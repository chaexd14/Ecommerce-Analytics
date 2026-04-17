"use client";

import {
  BarChart,
  Bar,
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
  orders: number;
}

interface SalesByRegionChartProps {
  data: SalesData[];
}

export function SalesByRegionChart({ data }: SalesByRegionChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Sales by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value?.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
            <Bar dataKey="profit" fill="#10b981" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
