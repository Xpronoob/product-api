# Ecommerce API

This API provides an ecommerce system.

## Public Routes:

### Get Index
GET http://localhost:3000/api/v1/ HTTP/1.1

Returns a hello message (JSON).

## Authentication:

### User Register
POST http://localhost:3000/api/v1/register HTTP/1.1
content-type: application/json
{
	"email": "admin@admin.com",
	"password": "password",
	"name": "admin",
	"lastName": "admin"
}

Generates a token and stores it in a cookie, then returns user information (JSON).

### User Login
POST http://localhost:3000/api/v1/login HTTP/1.1
content-type: application/json
{
	"email": "admin@admin.com",
	"password": "password"
}

This route allows a user to log in to the application. You must send a JSON object with the email and password fields.

### Get User Profile
GET http://localhost:3000/api/v1/profile
Content-Type: application/json

This route returns the information of the authenticated user(JSON).
