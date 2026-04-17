import { NextResponse } from "next/server";
import {connectDB} from "./../../../lib/mongodb";
import Order from "./../../../models/Order";

export async function GET() {
  try {
    await connectDB();

    // Get sales by region
    const salesByRegion = await Order.aggregate([
      {
        $group: {
          _id: "$region",
          sales: { $sum: "$sales" },
          profit: { $sum: "$profit" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { sales: -1 } },
    ]);

    // Get sales by category
    const salesByCategory = await Order.aggregate([
      {
        $group: {
          _id: "$category",
          sales: { $sum: "$sales" },
          profit: { $sum: "$profit" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { sales: -1 } },
    ]);

    // Get sales by date (last 30 days)
    const salesByDate = await Order.aggregate([
      {
        $group: {
          _id: "$date",
          sales: { $sum: "$sales" },
          profit: { $sum: "$profit" },
          quantity: { $sum: "$quantity" },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]);

    // Get overall stats
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$sales" },
          totalProfit: { $sum: "$profit" },
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: "$sales" },
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          salesByRegion,
          salesByCategory,
          salesByDate,
          stats: stats[0] || {
            totalSales: 0,
            totalProfit: 0,
            totalOrders: 0,
            avgOrderValue: 0,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
