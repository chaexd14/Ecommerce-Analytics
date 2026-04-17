import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "./../../../lib/mongodb";
import Order from "./../../../models/Order";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = searchParams.get("sort") || "date";
    const order = searchParams.get("order") || "-1";

    const skip = (page - 1) * limit;
    const sortOrder = parseInt(order) as 1 | -1;

    const total = await Order.countDocuments();

    const orders = await Order.find()
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: orders,
        pagination: {
          current: page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
