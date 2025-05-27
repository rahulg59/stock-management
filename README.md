# Apparel Vendor API

This is a Node.js with TypeScript REST API that allows vendors to manage apparel stock and pricing, and lets users check order fulfillment and lowest cost.

All data is stored persistently in a local JSON file, ensuring no data is lost on server restarts.

---

## Features

- Update or add stock quantity and price for a single apparel item.
- Batch update for multiple apparel items.
- Check if a customer order can be fulfilled**.
- Calculate the lowest cost to fulfill an order.
- API documentation available via Swagger UI.

---

## Requirements

- Node.js >= 16
- npm

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the project

```bash
npm run build
```

### 4. Start the server

```bash
npm start
```
The server will run on: http://localhost:3000

---

## API Documentation

Swagger is available on http://localhost:3000/api-docs

## API Endpoints

- POST **/api/apparel/update**: Update or Add a single apparel code, size, quantity, and price.
- POST **/api/apparel/batch-update**: Update multiple apparel records at once.
- POSt **/api/apparel/can-fulfill**: Check if a list of apparel items can be fulfilled.
- POST **/api/apparel/lowest-cost**: Get the total and per item cost to fulfill an order.
