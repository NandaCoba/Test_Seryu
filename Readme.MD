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

Sebelum menjalankan project, pastikan sudah install Node.js dan npm. Kemudian jalankan:

npm install

⚡ Running the Server

Start server development dengan perintah:

npm run dev

Server berjalan di:

http://localhost:3000

(Cek terminal untuk port yang sebenarnya jika berbeda)
🗃 Database Migration & Seeding
1. Apply Database Migrations

Sinkronisasi skema database dengan Prisma models:

npx prisma migrate dev

    Generate file SQL migration

    Terapkan perubahan ke database

    Catat history schema

2. Seed Initial Data

Isi database dengan data contoh:

npx prisma db seed

Pastikan file seed.ts sudah terkonfigurasi di folder /prisma.
🌐 API Endpoints
Get Driver Salary List

GET /v1/salary/driver/list

Description:
Mengambil daftar gaji driver dengan fitur paginasi dan filter opsional berdasarkan bulan dan tahun.
🔍 Query Parameters
Parameter	Tipe	Required	Deskripsi	Contoh
month	string	❌ No	Filter berdasarkan bulan (1-12)	?month=07
year	string	❌ No	Filter berdasarkan tahun (YYYY)	?year=2023
current	number	❌ No	Halaman saat ini (default: 1)	?current=2
page_size	number	❌ No	Jumlah item per halaman (default: 10)	?page_size=5
driver_code	string	❌ No	Filter berdasarkan kode driver	?driver_code=DRIVER001
name	string	❌ No	Filter berdasarkan nama driver (partial match)	?name=Driver Name 1
📋 Example Requests

    Get all drivers (tanpa filter)

GET /v1/salary/driver/list

Filter bulan Juli 2023, halaman 1, 10 item per halaman

GET /v1/salary/driver/list?month=7&year=2023

Paginasi halaman 2, 5 item per halaman

GET /v1/salary/driver/list?current=2&page_size=5

Filter dengan semua parameter

    GET /v1/salary/driver/list?month=3&year=2024&current=1&page_size=4&driver_code=DRIVER001&name=Driver Name 1

🔧 Environment Variables

Pastikan .env sudah berisi konfigurasi berikut:

DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
PORT=3000

Ganti dengan kredensial database kamu sendiri.
🛠 Troubleshooting
Masalah	Solusi
Database connection fails	Periksa file .env & pastikan database berjalan
Prisma migration errors	Jalankan npx prisma migrate reset (⚠️ HATI-HATI: Menghapus data)
API mengembalikan hasil kosong	Periksa format month & year (format MM/YYYY)
🔎 Debugging Commands

npx prisma studio  # Membuka GUI database
npx prisma generate # Generate ulang Prisma Client