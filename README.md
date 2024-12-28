# Bargenix_Saumya_Backend


# Discount Coupon API

This project is a simple API built with Node.js and Express.js to generate, validate, and log discount coupons for products. It includes a mock database and proper error handling.

---

## Features

1. **Generate a Discount Coupon**: Creates a unique, time-bound coupon for a product.
2. **Validate a Discount Coupon**: Verifies if a coupon is valid for a specific product and user.
3. **Mock Database**: Logs all coupon requests in an in-memory database.
4. **Error Handling**: Handles cases like invalid coupons, expired coupons, and missing data.

---

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

---

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd discount-api

	2.	Install dependencies:

npm install

Usage

Start the Server

Run the following command to start the server:

node index.js

By default, the server will run on http://localhost:3000.

API Endpoints

1. Generate Coupon
	•	URL: /generate-coupon
	•	Method: POST
	•	Description: Generates a unique, time-bound discount coupon for a product.
	•	Request Body:

{
  "productId": "string",
  "expiryMinutes": "number"
}


	•	Response:
	•	201: Coupon successfully created.

{
  "message": "Coupon generated",
  "coupon": {
    "id": "unique-id",
    "productId": "12345",
    "code": "DISCOUNT-XXXXXX",
    "expiry": "2024-12-28T15:30:00.000Z"
  }
}


	•	400: Missing productId or expiryMinutes.

2. Validate Coupon
	•	URL: /validate-coupon
	•	Method: POST
	•	Description: Validates a coupon for a specific product and user.
	•	Request Body:

{
  "code": "string",
  "productId": "string",
  "userId": "string"
}


	•	Response:
	•	200: Coupon is valid.

{
  "message": "Coupon is valid"
}


	•	404: Coupon not found.
	•	400: Coupon expired or not valid for the product.

3. View Coupons (Mock Database)
	•	URL: /coupons
	•	Method: GET
	•	Description: Fetches all generated coupons from the mock database.
	•	Response:
	•	200: List of coupons.

[
  {
    "id": "unique-id",
    "productId": "12345",
    "code": "DISCOUNT-XXXXXX",
    "expiry": "2024-12-28T15:30:00.000Z"
  }
]

Error Handling
	1.	400: Missing required fields or invalid data.
	2.	404: Coupon not found.
	3.	500: Server error (unexpected issues).

Mock Database

The mock database is an in-memory array that stores coupon details:

[
    {
        "id": "unique-id",
        "productId": "product-id",
        "code": "DISCOUNT-XXXXXX",
        "expiry": "2024-12-28T15:30:00.000Z"
    }
]

Testing the API

You can use tools like Postman or curl to test the API.

Example Commands:
	1.	Generate Coupon:

curl -X POST http://localhost:3000/generate-coupon \
-H "Content-Type: application/json" \
-d '{"productId": "12345", "expiryMinutes": 10}'


	2.	Validate Coupon:

curl -X POST http://localhost:3000/validate-coupon \
-H "Content-Type: application/json" \
-d '{"code": "DISCOUNT-XXXXXX", "productId": "12345", "userId": "user1"}'


	3.	View Coupons:

curl http://localhost:3000/coupons

Project Structure

.
├── index.js          # Main application file
├── package.json      # Project dependencies and metadata
└── README.md         # Project documentation

Future Improvements
	•	Replace the mock database with a real database (e.g., MongoDB, PostgreSQL).
	•	Add user authentication for coupon validation.
	•	Add rate limiting to prevent abuse of the coupon system.
