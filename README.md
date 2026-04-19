# 📊 Ecommerce Analytics Dashboard (Big Data Cloud Analytics Project)

## 📌 Project Overview

This project is a cloud-based Big Data analytics mini-application that demonstrates a complete data pipeline:

* Data ingestion from a real-world dataset
* Data cleaning and transformation
* Storage in a cloud NoSQL database (MongoDB Atlas)
* Visualization through a web-based dashboard

The system simulates a real-world analytics workflow used in industry.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (React + TypeScript)
* **Backend:** Next.js API Routes
* **Database:** MongoDB Atlas (Cloud)
* **Data Processing:** Node.js (TypeScript scripts)
* **Charts:** (Chart.js / Recharts / shadcn charts)

---

## 📂 Project Structure

```
/data
  ├── raw.json
  ├── cleaned.json

/src
  ├── scripts
  │     ├── convertXls.ts
  │     ├── cleanData.ts
  │     ├── importData.ts
  │
  ├── models
  │     └── Order.ts
  │
  ├── app / pages (Next.js frontend + API)
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js (v18 or higher recommended)
* npm or yarn
* MongoDB Atlas account

---

## 🔑 Environment Setup

Create a `.env` file in the root folder:

```
MONGODB_URI=your_mongodb_connection_string_here
```

Example:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/EcommerceAnalytics
```

---

## 🚀 How to Run Locally

### 1️⃣ Install dependencies

```bash
npm install
```

---

### 2️⃣ Convert Dataset (XLS → JSON)

```bash
npx ts-node src/scripts/convertXls.ts
```

This generates:

```
/data/raw.json
```

---

### 3️⃣ Clean and Transform Data

```bash
npx ts-node src/scripts/cleanData.ts
```

This performs:

* Null handling
* Data normalization
* Outlier removal (IQR)
* Excel date conversion

Output:

```
/data/cleaned.json
```

---

### 4️⃣ Import Data to MongoDB

```bash
npx ts-node -P tsconfig.scripts.json src/scripts/importData.ts
```

Expected output:

```
✅ MongoDB connected
✅ Imported XXXX records
```

---

### 5️⃣ Run the Next.js App

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 📊 Features

### ✔ Data Pipeline

* XLS → JSON → Cleaned JSON → MongoDB

### ✔ Dashboard

* KPI Cards (Total Sales, Profit, Orders)
* Charts:

  * Bar Chart (Sales by Category)
  * Pie Chart (Region Distribution)
  * Line Chart (Sales Trend)
* Interactive Filters (Region / Category)

---

## 🧠 Key Concepts Demonstrated

* Big Data Processing
* Data Cleaning & Transformation
* NoSQL Database (MongoDB)
* Cloud Integration
* Data Visualization


## 👥 Group Members

* King Arthur Amato
* Md. Rehean Patwary
* Elijah Lanuza
* Joshua Delovin
* Sean Soriano

---

## 📄 License

This project is for academic purposes only.
