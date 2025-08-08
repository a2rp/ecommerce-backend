# 🛒 MERN E-Commerce Backend

This is the backend of a simple eCommerce product manager built with **Node.js + Express + MongoDB**. It supports product creation (with image upload) and fetching all products.

---

## 🚀 Features

-   Add product with:
    -   Name
    -   Description
    -   Price
    -   Category
    -   Image (stored in `uploads/` folder)
-   Get all products
-   Image upload using `multer`
-   MongoDB model with timestamps

---

## 📦 Tech Stack

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   Multer (file uploads)
-   dotenv
-   CORS

---

## 🧪 API Endpoints

### `POST /api/products`

Add a new product.

**Request type**: `multipart/form-data`  
**Fields**:

-   `name` (string)
-   `description` (string)
-   `price` (number)
-   `category` (string)
-   `image` (file)

---

### `GET /api/products`

Fetch all products (sorted by newest first)

---

## 🔧 Setup & Run

```bash
cd backend
npm install
```

Create a .env file:

```
PORT=1198
MONGO_URI=mongodb://localhost:27017/ecommerce
```

Start the server:

```
npm run dev
```

Make sure uploads/ folder exists (for image saving):

Serve image URL on frontend like:

```
http://localhost:1198/uploads/<filename>

```

product.image = "/uploads/xyz.jpg"
