# Product API

This API provides a product & category system.

## Public Routes:

### Get Index
	GET http://localhost:4000/api/v1/ HTTP/1.1
Returns a hello message (JSON).

## Categories:

### GetMany
	GET http://localhost:4000/api/v1/categories HTTP/1.1
	Content-Type: application/json
Get a list of categories (JSON).

### GetOne
	GET http://localhost:4000/api/v1/categories/1 HTTP/1.1
	Content-Type: application/json
Get details of a specific category by ID (JSON).

### Create
	POST http://localhost:4000/api/v1/categories HTTP/1.1
	Content-Type: application/json
	{
		"name": "New Category",
		"description": "New Description Category"
	}
Create a new category with the given name and description.

### Update
	PUT http://localhost:4000/api/v1/categories/1 HTTP/1.1
	Content-Type: application/json
	{
		"name": "Categories",
		"description": "Description"
	}
Update an existing category by ID with the given name and description.

### Delete
	DELETE http://localhost:4000/api/v1/categories/55 HTTP/1.1
	Content-Type: application/json
Delete a category by ID.

## Products:

### GetMany
	GET http://localhost:4000/api/v1/products HTTP/1.1
	Content-Type: application/json
Get a list of products (JSON).

### GetOne
	GET http://localhost:4000/api/v1/products/1 HTTP/1.1
	Content-Type: application/json
Get details of a specific product by ID (JSON).

### Create
	POST http://localhost:4000/api/v1/products HTTP/1.1
	Content-Type: application/json
	{
		"name": "New Product",
		"description": "New Description",
		"price": 19.99,
		"stock": 100,
		"categoryId": 1
	}
Create a new product with the given details.

### Update
	PUT http://localhost:4000/api/v1/products/1 HTTP/1.1
	Content-Type: application/json
	{
		"name": "Updated Product",
		"description": "Updated Description",
		"price": 24.99,
		"stock": 50,
		"categoryId": 2
	}
Update an existing product by ID with the given details.

### Delete
	DELETE http://localhost:4000/api/v1/products/55 HTTP/1.1
	Content-Type: application/json
Delete a product by ID.