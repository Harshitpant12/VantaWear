# VantaWear - Serverless MERN E-Commerce Architecture

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/Harshitpant12/vantawear)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

**VantaWear** is a premium, full-stack e-commerce platform built with the MERN stack. Designed with a brutalist aesthetic, it features secure JWT authentication, real-time Stripe payment webhooks, an interactive admin analytics dashboard, and a serverless architecture deployed on Vercel's edge network.

---

## Live Demo

[**View Live Application**](https://vantawear.vercel.app/)

---

## Key Features

- **Serverless Architecture:** Deployed as an optimized monorepo on Vercel utilizing Serverless Functions and custom routing rules.
- **Fault-Tolerant Checkout:** Integrated Stripe Elements with background webhook verification to ensure orders are created even if the client disconnects.
- **Advanced Authentication:** Built a custom JWT system with secure, cross-domain cookies utilizing reverse proxy configurations.
- **Real-Time Admin Analytics:** Implemented a protected dashboard using Recharts to visualize revenue flow and track live order statuses.
- **State Management:** Utilized React Context API for global cart state and user session persistence across the application.
- **Responsive UI/UX:** Built a mobile-first, highly accessible frontend utilizing Tailwind CSS for a premium, heavy-weight streetwear aesthetic.
- **Production-Ready Structure:** Designed with a scalable backend architecture, modular code organization, environment-based configuration, and maintainable project structure suitable for real-world deployment.

---

## Tech Stack

### Frontend
- **React.js (Vite)**: Modern, component-based UI library with fast bundling.
- **Tailwind CSS**: Utility-first CSS framework for brutalist, responsive design.
- **Recharts**: Composable charting library for admin dashboard analytics.
- **Context API**: Global state management for global cart state.
- **Axios**: HTTP client with custom configurations for cross-domain cookies.

### Backend
- **Node.js & Express.js**: RESTful API structured for serverless deployment.
- **MongoDB & Mongoose**: NoSQL database with complex aggregation pipelines.
- **Stripe API**: Secure payment processing and webhook event handling.
- **JWT & Bcrypt.js**: Stateless authentication and industry-standard password hashing.
- **dotenv & CORS**: Environment configuration and cross-origin request handling.

---

## Screenshots

_Screenshots will be added soon..._

---

## Architecture & Project Structure

The repository is structured as a monorepo, housing both the frontend client and the serverless backend API.

```bash
vantawear/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request logic & business rules (orders, products, auth)
│   │   ├── lib/           # Utility functions (DB connection, JWT generation)
│   │   ├── middlewares/   # Auth checks, admin validation, & error handling
│   │   ├── models/        # Mongoose schemas (User, Product, Order)
│   │   ├── routes/        # API endpoints definition
│   │   └── index.js       # App entry point (Exported for Vercel)
│   └── vercel.json        # Serverless deployment configuration
└── frontend/
    ├── public/            # Static assets and favicons
    ├── src/
    │   ├── api/           # Axios configurations
    │   ├── assets/        # Static cloths assets
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # View pages (Shop, Dashboard, Cart)
    │   ├── App.jsx        # Main routing logic
    │   └── main.jsx       # Frontend entry point
    └── vercel.json        # Reverse proxy and SPA routing rules

```

---

## Installation & Setup

Follow these steps to run the project locally.

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (Local instance or MongoDB Atlas URL)
- **Stripe Account** (For test API keys)
- **Git**

### 1. Clone the Repository

```bash
git clone [https://github.com/Harshitpant12/vantawear.git](https://github.com/Harshitpant12/vantawear.git)
cd vantawear
```

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` root folder with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_random_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_local_webhook_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

_The server should run on http://localhost:5001_

### 3. Frontend Setup

Open a new terminal window, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` root folde:

```
VITE_API_URL=http://localhost:5001/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Start the React development server:

```bash
npm run dev
```

_The app should now be live on http://localhost:5173_

---

## API Reference

### Product & Order Routes

| Method | Endpoint | Description | Protected? |
| -------- | -------------------------- | -------------------------------------------- | :--------: |
| **GET** | `/api/products` | Fetch all active products | ❌ |
| **GET** | `/api/products/:id` | Fetch single product details | ❌ |
| **GET** | `/api/orders/admin-stats` | Fetch aggregate data for admin dashboard | ✅ (Admin) |
| **POST** | `/api/payment/webhook` | Stripe event listener for successful payments | ❌ (Stripe) |

### Auth Routes

| Method | Endpoint | Description | Protected? |
| -------- | -------------------------- | -------------------------------------------- | :--------: |
| **POST** | `/api/auth/signup` | Register a new user | ❌ |
| **POST** | `/api/auth/login` | Authenticate user & issue cross-domain cookie | ❌ |
| **POST** | `/api/auth/logout` | Destroy session cookie | ✅ |
| **GET** | `/api/auth/me` | Verify current user session & authentication | ✅ |

---

## Contributing

Contributions are welcome!

1.  **Fork** the project.
2.  Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.