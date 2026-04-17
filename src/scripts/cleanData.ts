import fs from "fs";
import path from "path";

function excelDateToString(serial: number) {
  if (!serial || isNaN(serial)) return null;

  const date = new Date((serial - 25569) * 86400 * 1000);
  return date.toISOString().split("T")[0];
}

const rawPath = path.join(process.cwd(), "data", "raw.json");

const rawData = JSON.parse(
  fs.readFileSync(rawPath, "utf-8")
);

let normalized = rawData.map((item: any) => ({
  order_id: item["Order ID"],
  date: excelDateToString(Number(item["Order Date"])),
  region: item["Region"],
  category: item["Product Category"],
  quantity: Number(item["Order Quantity"]) || 0,
  sales: Number(item["Sales"]) || 0,
  profit: Number(item["Profit"]) || 0,
}));

let cleaned = normalized.filter(
  (item: any) =>
    item.sales > 0 &&
    item.category &&
    item.date
);

console.log("After filter:", cleaned.length);

if (cleaned.length === 0) {
  console.log("No valid data found");
  process.exit(1);
}

const maxSales = Math.max(...cleaned.map((i: any) => i.sales));

cleaned = cleaned.map((item: any) => ({
  ...item,
  sales_normalized: item.sales / maxSales,
}));

const values = cleaned.map((i: any) => i.sales).sort((a:number, b:number) => a - b);

const q1 = values[Math.floor(values.length * 0.25)];
const q3 = values[Math.floor(values.length * 0.75)];
const iqr = q3 - q1;

cleaned = cleaned.filter((i: any) => {
  return i.sales >= q1 - 1.5 * iqr && i.sales <= q3 + 1.5 * iqr;
});

const outputPath = path.join(process.cwd(), "data", "cleaned.json");

fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2));

console.log("Final cleaned rows:", cleaned.length);