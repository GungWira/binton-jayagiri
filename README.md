# 🎾 Binton Jayagiri

![Binton Jayagiri Banner](./public/banner-binton-jayagiri.png)

Binton Jayagiri is a web application developed by **Anak Agung Gede Putu Wiradarma** using **Next.js, Prisma, MySQL, and JWT** for authentication. This project serves as a platform for managing badminton court bookings efficiently.

## 🚀 Tech Stack

- **Frontend:** Next.js
- **Backend:** Next.js API Routes
- **Database:** MySQL (using Prisma ORM)
- **Authentication:** JWT (JSON Web Token)

---

## 🔧 Installation Guide

Follow these steps to set up the project after cloning the repository:

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/binton-jayagiri.git
cd binton-jayagiri
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

```sh
NEXT_PUBLIC_REQ_URL="http://localhost:3000/api"
DATABASE_URL="mysql://user:password@localhost:3306/db_name"
JWT_SECRET="your-secret-key"
NEXT_PUBLIC_CLIENT_KEY = "your-midtrans-client-key"
SECRET_KEY = "your-midtrans-secret-key"
```

### 4️⃣ Run Database Migrations

```sh
npx prisma migrate dev --name init
```

### 5️⃣ Generate Prisma Client

```sh
npx prisma generate
```

### 6️⃣ Start the Development Server

```sh
npm run dev
```

---

## 📌 Features

- ✅ User authentication with JWT
- ✅ Court booking management
- ✅ MySQL database integration using Prisma
- ✅ Secure API with Next.js API routes

---

## 🤝 Contributing

Feel free to fork this repository, submit issues, or make pull requests.

---

## 📜 License

This project is licensed under the MIT License.
