# GenZ Store

A small, responsive MERN e-commerce storefront built as a learning and portfolio
project. Browse products loaded from MongoDB, search and filter the catalog,
view product details, and manage a client-side shopping cart.

## Features

- Product catalog fetched from the Express API with RTK Query
- Case-insensitive product-name search and category filtering
- Product details pages at `/products/:id`
- Redux Toolkit cart with quantity controls, removal, and totals
- Responsive charcoal storefront with blue accents
- Product image fallbacks for the sample products

Cart contents and filters are held in Redux memory and reset on a full page
reload. Checkout, payment, and authentication are not included.

## Technology

- **Frontend:** React, JavaScript, Vite, Tailwind CSS, React Router DOM
- **Client state:** Redux Toolkit and React Redux
- **Server data:** RTK Query
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB

## Architecture

- `client/src/main.jsx` mounts the app with the Redux `Provider` and
  `BrowserRouter`.
- `client/src/app/store.js` registers the cart, product-filter, and RTK Query
  reducers, and the RTK Query middleware.
- `client/src/features/products/` contains the product API, catalog,
  search/filter state, cards, image handling, and product details page.
- `client/src/features/cart/` contains the cart Redux slice and cart page.
- `server/index.js` connects to MongoDB, configures CORS, and mounts the product
  API routes.
- `server/src/` contains the Mongoose model, database connection, controller,
  routes, and seed script.

## Project structure

```text
.
|-- client/
|   |-- src/
|   |   |-- app/store.js
|   |   |-- features/
|   |   |   |-- cart/CartPage.jsx
|   |   |   |-- cart/cartSlice.js
|   |   |   \-- products/
|   |   |       |-- filterSlice.js
|   |   |       |-- ProductCard.jsx
|   |   |       |-- ProductDetailsPage.jsx
|   |   |       |-- ProductImage.jsx
|   |   |       |-- ProductList.jsx
|   |   |       |-- productApi.js
|   |   |       \-- productImages.js
|   |   |-- App.jsx
|   |   |-- index.css
|   |   \-- main.jsx
|   |-- package.json
|   \-- vite.config.js
|-- server/
|   |-- src/
|   |   |-- config/db.js
|   |   |-- controllers/productController.js
|   |   |-- models/Product.js
|   |   |-- routes/productRoutes.js
|   |   \-- seed/seedProducts.js
|   |-- .env.example
|   |-- index.js
|   \-- package.json
\-- README.md
```

## Prerequisites

- Node.js and npm (use a version compatible with the installed Vite release)
- MongoDB running locally, or a MongoDB connection string you are authorized to
  use

## Setup

### 1. Configure the backend

From the project root, install the server dependencies:

```sh
cd server
npm install
```

Create `server/.env` from the example. In PowerShell:

```powershell
Copy-Item .env.example .env
```

The example uses a local MongoDB database and the default development origins:

```dotenv
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
CLIENT_ORIGIN=http://localhost:5173
```

Change `MONGO_URI` if your MongoDB server uses a different connection string.
Keep real credentials in your local `.env`; do not commit that file.

### 2. Seed sample products (optional)

With MongoDB running and `server/.env` configured:

```sh
npm run seed
```

> **Warning:** The seed script deletes all documents in the `products`
> collection before inserting the six sample products. Run it only against a
> disposable development database or when replacing that collection is
> intentional.

### 3. Start the backend

From the `server` directory:

```sh
npm run dev
```

The API listens on `http://localhost:5000` by default. Keep this terminal
running.

### 4. Start the frontend

In a second terminal, from the project root:

```sh
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal (by default
`http://localhost:5173`). The current frontend API base URL is
`http://localhost:5000`.

To create and preview a production build:

```sh
npm run build
npm run preview
```

The frontend uses browser-history routes. The Vite development and preview
servers support direct route refreshes; a production host must also be
configured to serve `index.html` for application routes such as
`/products/:id`.

## API

Base URL: `http://localhost:5000`

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Check server health |
| `GET` | `/api/products` | List products |
| `GET` | `/api/products/:id` | Get a product by MongoDB ID |
| `POST` | `/api/products` | Create a product |

Product documents include `_id`, `name`, `description`, `price`, `category`,
`image`, and `stock`. Creating a product requires `name`, `price`, and
`category`; the other fields are optional.

## Screenshots

Screenshots are not included yet. Add captured images here when available:

- Storefront: `docs/screenshots/storefront.png`
- Product details: `docs/screenshots/product-details.png`
- Shopping cart: `docs/screenshots/cart.png`

## Testing

No automated test script or test files are currently configured. Useful manual
checks:

1. Open `/` and confirm products load from the API.
2. Search with different letter casing, select a category, combine both
   filters, and clear them.
3. Open a product, refresh its `/products/:id` URL, and try an invalid ID.
4. Add products to cart, change quantities, remove an item, and clear the cart.
5. Check the storefront, details, and cart at desktop and mobile widths.
6. Confirm `http://localhost:5000/api/health` returns `{"status":"ok"}`.
