# Ecommerce Backend

A Node.js and Express API for managing ecommerce products with MongoDB and Mongoose. Product images are uploaded to Cloudinary and returned as hosted URLs.

## Features

- Create products with a name, description, non-negative price, category, and image
- List products with newest items first
- Validate image type and limit uploads to 5 MB
- Apply per-IP rate limits to product reads and writes
- Start accepting requests after the MongoDB connection is ready

## Requirements

- Node.js 18 or newer
- MongoDB connection string
- Cloudinary account credentials for image uploads

## Run locally

```bash
npm install
cp .env.example .env
```

Add your MongoDB and Cloudinary values to `.env`, then start the server:

```bash
npm run dev
```

The API listens on port `5000` by default. Set `PORT` to change it.

## Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string |
| `CLOUDINARY_CLOUD_NAME` | Yes for uploads | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes for uploads | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes for uploads | Cloudinary API secret |
| `PORT` | No | HTTP port; defaults to `5000` |

## API

### `GET /`

Returns a short API health message. The server only starts listening after MongoDB connects.

### `GET /api/products`

Returns all products, newest first:

```json
{
  "success": true,
  "products": []
}
```

### `POST /api/products`

Send `multipart/form-data` with these fields:

| Field | Type | Notes |
| --- | --- | --- |
| `name` | Text | Required |
| `description` | Text | Required |
| `price` | Number | Required; must be zero or greater |
| `category` | Text | Required |
| `image` | File | Required; JPG, PNG, or WEBP, up to 5 MB |

The uploaded image is stored in the `ecommerce-products` Cloudinary folder. Its hosted URL is saved with the product.

## Rate limits

Product listing is limited to 100 requests per IP every 10 minutes. Product creation is limited to 10 requests per IP every 15 minutes. The built-in store is per process, so limits reset when the server restarts and are not shared across multiple server instances.

## Links

- Portfolio: [ashishranjan.net](https://www.ashishranjan.net/)
- GitHub: [a2rp](https://github.com/a2rp)
- LinkedIn: [Ashish Ranjan](https://www.linkedin.com/in/aashishranjan)
