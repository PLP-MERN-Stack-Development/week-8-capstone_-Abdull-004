# 🌾 Garissa Market Hub

Garissa Market Hub is a full-stack agrovet e-commerce platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The application allows customers to browse, add to cart, and purchase agrovet products, while providing an admin dashboard for managing inventory and orders.

---

## 🚀 Features

### 🛍 For Customers
- Browse agrovet products with images, prices, and descriptions
- Add items to cart and proceed to checkout
- Pay via **M-Pesa** integration (Kenya mobile payment)
- Responsive design for mobile and desktop users

### 🛠 For Admins
- Secure admin login
- Full CRUD operations for product management
- Order management (view and track user orders)
- Dashboard with stock insights and order summaries

---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Payments**: M-Pesa (Safaricom Daraja API)
- **Deployment**: Vercel (frontend), Render / Railway / Cyclic (backend)

---

## 🗂 Folder Structure

garissa-market-hub/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/ # Cart context, Auth context
│ │ └── App.jsx
│ └── index.html
├── server/ # Node + Express backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── server.js
└── README.md

yaml
Copy
Edit

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/garissa-market-hub.git
cd garissa-market-hub
2. Install Dependencies
Backend
bash
Copy
Edit
cd server
pnpm install
Frontend
bash
Copy
Edit
cd ../client
pnpm install
3. Set Up Environment Variables
Create .env files in the /server folder:

ini
Copy
Edit
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
CALLBACK_URL=https://your-backend.com/mpesa/callback
4. Run the App Locally
Start Backend
bash
Copy
Edit
cd server
pnpm run dev
Start Frontend
bash
Copy
Edit
cd client
pnpm run dev
🧪 Testing
✅ Unit tests with Jest

✅ Integration tests with Supertest (backend)

✅ E2E testing with Cypress (frontend)

🌐 Deployment
Frontend hosted on Vercel

Backend deployed to Render or Railway

MongoDB hosted on MongoDB Atlas

👤 Admin Access
To access the admin dashboard:

Go to /admin

Login with the admin email & password

Only verified admins have access to product and order management features.

