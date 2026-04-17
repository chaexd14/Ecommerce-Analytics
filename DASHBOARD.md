# Ecommerce Analytics Dashboard

A modern, full-stack analytics dashboard built with Next.js, MongoDB, shadcn/ui, and Recharts.

## Features

✨ **Beautiful Dashboard UI**
- Modern grid-based layout with responsive design
- Real-time statistics cards showing key metrics
- Professional styling with Tailwind CSS

📊 **Interactive Charts**
- Sales by region (Bar Chart)
- Sales by category (Pie Chart)
- Sales trend over time (Line Chart)
- Powered by Recharts

📋 **Data Tables**
- Paginated orders table
- Sort and filter capabilities
- Detailed order information

🔧 **Tech Stack**
- **Frontend**: Next.js 16, React 19, TypeScript
- **UI Library**: shadcn/ui (custom implementation)
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Backend**: Next.js API Routes

## Installation

1. **Install dependencies:**

```bash
npm install
npm install recharts
```

2. **Initialize shadcn/ui components:**

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add card button table
```

## Setup

1. **Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

2. **Database Connection**
   
   The application uses MongoDB with Mongoose. Make sure your MongoDB instance is running and the connection string is configured in `.env.local`.

3. **Data Import**
   
   If you haven't already imported data:
   ```bash
   npx ts-node -P tsconfig.scripts.json src/scripts/importData.ts
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Mode

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── orders/route.ts       # Orders data API with pagination
│   │   └── stats/route.ts        # Analytics stats API
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── table.tsx
│   ├── StatCard.tsx              # Statistics card component
│   ├── SalesByRegionChart.tsx    # Regional sales chart
│   ├── SalesTrendChart.tsx       # Sales trend line chart
│   ├── SalesByCategoryChart.tsx  # Category sales pie chart
│   └── OrdersTable.tsx           # Orders table with pagination
├── lib/
│   └── mongodb.ts                # MongoDB connection
└── models/
    └── Order.ts                  # Order data model
```

## API Endpoints

### GET `/api/orders`
Fetch paginated orders data.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `sort` (string): Sort field (default: "date")
- `order` (number): Sort order, -1 for descending, 1 for ascending (default: -1)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "current": 1,
    "limit": 10,
    "total": 1000,
    "pages": 100
  }
}
```

### GET `/api/stats`
Fetch analytics statistics including:
- Sales by region
- Sales by category
- Sales trend by date
- Overall statistics (total sales, profit, orders, average order value)

## Usage Examples

### Fetching Dashboard Data

```typescript
// Fetch statistics
const statsRes = await fetch('/api/stats');
const stats = await statsRes.json();

// Fetch orders with pagination
const ordersRes = await fetch('/api/orders?page=1&limit=10');
const orders = await ordersRes.json();
```

### Navigating the Dashboard

1. **Home Page**: Visit [http://localhost:3000](http://localhost:3000) for an overview
2. **Dashboard**: Click "View Dashboard" to access the full analytics dashboard at [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
3. **Pagination**: Use Previous/Next buttons to navigate through orders
4. **Charts**: Hover over charts for detailed information
5. **Statistics**: View key metrics at the top of the dashboard

## Customization

### Add More Charts
Create new chart components in `src/components/` and import them in the dashboard page.

### Modify Dashboard Layout
Edit `src/app/dashboard/page.tsx` to rearrange components or adjust the grid layout.

### Update Styling
All components use Tailwind CSS classes. Modify class names in component files to customize appearance.

### Add New API Endpoints
Create new route files in `src/app/api/` following the Next.js API routes pattern.

## Troubleshooting

**MongoDB Connection Issues**
- Ensure MongoDB is running
- Check connection string in `.env.local`
- Verify network access if using MongoDB Atlas

**Data Not Showing**
- Run the import script: `npx ts-node -P tsconfig.scripts.json src/scripts/importData.ts`
- Check MongoDB connection and data

**Styling Issues**
- Ensure Tailwind CSS is properly installed
- Run `npm install` to ensure all dependencies are present

## Performance Tips

- Charts auto-load on dashboard mount
- Orders pagination prevents loading too much data at once
- MongoDB aggregation queries optimize data retrieval
- Next.js API routes cache responses when possible

## Future Enhancements

- [ ] Add search and filtering options
- [ ] Export data to CSV/PDF
- [ ] Real-time data updates with WebSocket
- [ ] User authentication and authorization
- [ ] Additional chart types and analytics
- [ ] Dark mode support
- [ ] Mobile app

## License

MIT

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.
