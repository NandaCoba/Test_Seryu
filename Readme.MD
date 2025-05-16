README - Menjalankan Project dengan Prisma
Langkah-langkah menjalankan project
1. Install dependencies

Jalankan perintah berikut untuk menginstall semua dependencies yang dibutuhkan project:

npm i

2. Jalankan Development Server

Setelah dependencies terpasang, jalankan server dalam mode development:

npm run dev

Server biasanya berjalan di http://localhost:3000 (atau port lain sesuai konfigurasi).
3. Migrasi Database dengan Prisma

Untuk membuat dan menerapkan perubahan skema database, jalankan perintah migrasi Prisma:

npx prisma migrate dev

Perintah ini akan membuat migrasi baru dan mengubah struktur database sesuai dengan definisi di schema.prisma.
4. Seed Database (Isi Data Awal)

Setelah migrasi, isi data awal pada database dengan perintah berikut:

npx prisma db seed

Pastikan script seeding sudah disiapkan di folder prisma (biasanya seed.js atau seed.ts).
Catatan Penting

    Pastikan environment variable di .env sudah benar, terutama DATABASE_URL.

    Jika mengubah model Prisma, ulangi langkah migrasi dan seeding agar database tetap sinkron.

    Gunakan fitur query params Month dan Year sesuai dengan dokumentasi API yang disediakan.