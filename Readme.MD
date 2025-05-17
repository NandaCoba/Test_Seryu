Driver Salary Management System - API Documentation
📌 Table of Contents

    Project Setup

    Running the Server

    Database Migration & Seeding

    API Endpoints

    Query Parameters

    Environment Variables

    Troubleshooting

🚀 Project Setup
Install Dependencies

Before running the project, ensure you have Node.js and npm installed. Then, install all required dependencies:
bash

npm install

⚡ Running the Server

Start the development server using:
bash

npm run dev

The server will run at:

http://localhost:3000

(Check your terminal for the exact port if different.)
🗃 Database Migration & Seeding
1. Apply Database Migrations

To sync the database schema with Prisma models, run:
bash

npx prisma migrate dev

This will:

    Generate SQL migration files

    Apply changes to the database

    Keep track of schema history

2. Seed Initial Data

Populate the database with sample data using:
bash

npx prisma db seed

(Ensure seed.ts is properly configured in /prisma.)
🌐 API Endpoints
Get Driver Salary List

GET /v1/salary/driver/list

Description:
Retrieves a paginated list of driver salaries with optional filtering by month and year.
🔍 Query Parameters
Parameter	Type	Required	Description	Example
month	string	❌ No	Filter by month (1-12)	?month=07
year	string	❌ No	Filter by year (YYYY)	?year=2023
current	number	❌ No	Current page (default: 1)	?current=2
page_size	number	❌ No	Items per page (default: 10)	?page_size=5
Example Requests

    Get all drivers (no filters)

GET /v1/salary/driver/list

Filter by July 2023 (Page 1, 10 items)

GET /v1/salary/driver/list?month=07&year=2023

Paginated results (Page 2, 5 items)

    GET /v1/salary/driver/list?current=2&page_size=5

🔧 Environment Variables

Ensure .env is configured with:
env

DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
PORT=3000

(Replace with your actual database credentials.)
🛠 Troubleshooting
Common Issues
Problem	Solution
Database connection fails	Check .env & ensure DB is running
Prisma migration errors	Run npx prisma migrate reset (⚠️ Caution: Deletes data)
API returns empty results	Verify month & year format (MM/YYYY)
Debugging Commands
bash

npx prisma studio  # Open DB GUI
npx prisma generate # Regenerate Prisma Client