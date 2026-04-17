import xlsx from "xlsx";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "raw.xls");

const workbook = xlsx.readFile(filePath);

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const jsonData = xlsx.utils.sheet_to_json(sheet);

fs.writeFileSync(
  path.join(process.cwd(), "data", "raw.json"),
  JSON.stringify(jsonData, null, 2)
);

console.log("XLS converted to JSON");