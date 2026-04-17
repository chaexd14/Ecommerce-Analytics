"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/src/components/StatCard";
import { SalesByRegionChart } from "@/src/components/SalesByRegionChart";
import { SalesTrendChart } from "@/src/components/SalesTrendChart";
import { SalesByCategoryChart } from "@/src/components/SalesByCategoryChart";
import { OrdersTable } from "@/src/components/OrdersTable";

interface Order {
  _id: string;
  order_id: number;
  date: string;
  region: string;
  category: string;
  quantity: number;
  sales: number;
  profit: number;
}

interface Stats {
  totalSales: number;
  totalProfit: number;
  totalOrders: number;
  avgOrderValue: number;
}

interface ApiResponse {
  success: boolean;
  data: {
    salesByRegion: Array<{
      _id: string;
      sales: number;
      profit: number;
      orders: number;
    }>;
    salesByCategory: Array<{
      _id: string;
      sales: number;
      profit: number;
      orders: number;
    }>;
    salesByDate: Array<{
      _id: string;
      sales: number;
      profit: number;
      quantity: number;
    }>;
    stats: Stats;
  };
}

interface OrdersResponse {
  success: boolean;
  data: Order[];
  pagination: {
    current: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [salesByRegion, setSalesByRegion] = useState<Array<{ _id: string; sales: number; profit: number; orders: number }>>([]);
  const [salesByCategory, setSalesByCategory] = useState<Array<{ _id: string; sales: number; profit: number; orders: number }>>([]);
  const [salesByDate, setSalesByDate] = useState<Array<{ _id: string; sales: number; profit: number; quantity: number }>>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data: ApiResponse = await res.json();
        if (data.success) {
          setStats(data.data.stats);
          setSalesByRegion(data.data.salesByRegion);
          setSalesByCategory(data.data.salesByCategory);
          setSalesByDate(data.data.salesByDate);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders?page=${currentPage}&limit=10`);
        const data: OrdersResponse = await res.json();
        if (data.success) {
          setOrders(data.data);
          setTotalPages(data.pagination.pages);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to your ecommerce analytics dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Sales"
            value={stats?.totalSales || 0}
            description="All time revenue"
          />
          <StatCard
            title="Total Profit"
            value={stats?.totalProfit || 0}
            description="Net profit"
          />
          <StatCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            description="All orders"
          />
          <StatCard
            title="Avg Order Value"
            value={stats?.avgOrderValue || 0}
            description="Average value per order"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {salesByRegion.length > 0 && (
            <SalesByRegionChart data={salesByRegion} />
          )}
          {salesByCategory.length > 0 && (
            <SalesByCategoryChart data={salesByCategory} />
          )}
        </div>

        {/* Sales Trend */}
        <div className="mb-8">
          {salesByDate.length > 0 && <SalesTrendChart data={salesByDate} />}
        </div>

        {/* Orders Table */}
        <OrdersTable
          orders={orders}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
