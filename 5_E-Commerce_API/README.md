# Mini E-Commerce API

REST API on Express. Data is stored in JSON files, authentication uses JWT,
passwords are hashed with bcryptjs.

## How to run

```bash
npm install
```

Create a `.env` file in the project root:

```
PORT=3001
SECRET=your_jwt_secret_here
```

Start the server:

```bash
npm start
```

Runs at `http://localhost:3001`.

## Admin account

`POST /auth/register` always creates a `customer`. The admin is seeded by hand
in `data/users.json`.

| username | password |
|----------|----------|
| `FILL_ME_IN` | `FILL_ME_IN` |

## Endpoints

| Method | Path | Access | Description |
|--------|------|--------|-------------|
| POST | `/auth/register` | anyone | Create a customer account. 409 if the username is taken. |
| POST | `/auth/login` | anyone | Return a JWT valid for 2 hours. |
| GET | `/products` | anyone | List products. Supports `?category=` and `?sort=price`. |
| GET | `/products/:id` | anyone | One product, or 404. |
| POST | `/products` | admin | Create a product. 400 if `name` or `price` is missing. |
| PUT | `/products/:id` | admin | Replace a product's fields. 404 if it doesn't exist. |
| DELETE | `/products/:id` | admin | Remove a product. 204, no body. |
| POST | `/orders` | logged in | Checkout. Validates stock, computes the total, decrements stock. |
| GET | `/orders` | logged in | The caller's own orders only. |
| GET | `/orders/:id` | owner or admin | 404 if missing, 403 if it belongs to someone else. |

Protected endpoints expect the token in a header:

```
Authorization: Bearer <token>
```

Missing or invalid token -> 401. Valid token, wrong role -> 403.

## Project structure

```
server.js            entry point
routes/              auth, products, orders
middleware/auth.js   authenticate (JWT) and authorize (roles)
utils/fileDB.js      read/write helpers for the JSON files
data/                users.json, products.json, orders.json
```