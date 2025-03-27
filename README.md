# Avtomobil Boshqaruv API

## 📌 Umumiy ma'lumot

Avtomobil Boshqaruv API — bu avtomobillar bilan bog‘liq ma'lumotlarni, jumladan modellar, brendlar, Categorylar va foydalanuvchi autentifikatsiyasini boshqarish uchun mo‘ljallangan backend tizimi. Ushbu loyiha **Node.js, Express.js, MongoDB** dan foydalangan holda yaratilgan va **RESTful API** ishlab chiqishning eng yaxshi amaliyotlariga amal qiladi.

## 🛠 Ishlatilgan texnologiyalar

- **Backend:** Node.js, Express.js
- **Ma'lumotlar bazasi:** MongoDB + Mongoose ORM
- **Autentifikatsiya:** JWT (JSON Web Token)
- **Validatsiya:** Joi / Express Validator
- **Xavfsizlik:** Helmet, CORS, Cheklangan so‘rovlar (Rate Limiting), parollarni shifrlash uchun bcrypt
- **Loglar va monitoring:** Morgan, Winston

## ⚡ Xususiyatlar

- 🔐 **Foydalanuvchi autentifikatsiyasi** (Ro‘yxatdan o‘tish, Kirish, JWT orqali himoya)
- 🚗 **Avtomobillarni boshqarish** (Yaratish, O‘qish, Tahrirlash, O‘chirish)
- 🏷 **Category va brendlarni boshqarish**
- 📊 **Kengaytirilgan so‘rovlar** (Filtrlash, Saralash, Paginatsiya)
- 🔑 **Rolga asoslangan kirish boshqaruvi (Admin/Foydalanuvchi)**
- 📡 **RESTful API Dizayni**
- 🔥 **Xavfsiz API (Rate Limiting & CORS bilan himoyalangan)**

## 🚀 O‘rnatish va sozlash

### 1️⃣ Repozitoriyani klonlash

git clone https://github.com/your-username/car-management-api.git
cd car-management-api

```

### 2️⃣ Kerakli bog‘liqliklarni o‘rnatish


npm install
```

### 3️⃣ Muhit o‘zgaruvchilarini sozlash

Loyiha ildiz katalogida `.env` faylini yarating va quyidagicha sozlang:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/car_management
JWT_SECRET=your_jwt_secret_key
```

### 4️⃣ Serverni ishga tushirish

npm run dev

````

API `http://localhost:5000` da ishlaydi.

---

## 📌 Asosiy modellar va ularning vazifalari

### 🔹 **Users modeli**

- `id`: Unikal identifikator
- `name`: Foydalanuvchi ismi
- `email`: Elektron pochta (takrorlanmas)
- `password`: Shifrlangan parol
- `role`: Foydalanuvchi roli (admin/foydalanuvchi)
- `createdAt`: Ro‘yxatdan o‘tgan vaqti

### 🔹 **Car modeli**

- `id`: Unikal identifikator
- `model`: Avtomobil modeli
- `brand`: Brend modeli bilan bog‘langan
- `category`: Category modeli bilan bog‘langan
- `year`: Ishlab chiqarilgan yili
- `price`: Avtomobil narxi
- `available`: Mavjudlik holati (true/false)
- `createdAt`: Ro‘yxatdan o‘tgan vaqti

### 🔹 **Category modeli**

- `id`: Unikal identifikator
- `name`: Category nomi (SUV, Sedan, Elektr va h.k.)
- `createdAt`: Yaratilgan vaqt

### 🔹 **Brend modeli**

- `id`: Unikal identifikator
- `name`: Brend nomi (Tesla, BMW, Mercedes, Toyota va h.k.)
- `createdAt`: Yaratilgan vaqt

### 🔹 **Order modeli**

- `id`: Unikal identifikator
- `user`: Foydalanuvchi modeli bilan bog‘langan
- `car`: Avtomobil modeli bilan bog‘langan
- `status`: Buyurtma holati (kutilmoqda, bajarildi, bekor qilindi)
- `createdAt`: Buyurtma yaratilgan vaqt

### 🔹 **Payment modeli**

- `id`: Unikal identifikator
- `order`: Buyurtma modeli bilan bog‘langan
- `amount`: To‘lov miqdori
- `status`: To‘lov holati (kutilmoqda, to‘langan, muvaffaqiyatsiz)
- `method`: To‘lov usuli (karta, PayPal, bank o‘tkazmasi)
- `createdAt`: To‘lov vaqti

### 🔹 **Review va Rating modeli**

- `id`: Unikal identifikator
- `user`: Foydalanuvchi modeli bilan bog‘langan
- `car`: Avtomobil modeli bilan bog‘langan
- `rating`: Baholash (1-5)
- `comment`: Fikr-mulohaza
- `createdAt`: Sharh qoldirilgan vaqt

### 🔹 **Admin paneli loglari modeli**

- `id`: Unikal identifikator
- `admin`: Admin foydalanuvchi modeli bilan bog‘langan
- `action`: Amaliyot tavsifi
- `timestamp`: Log vaqti

### 🔹 **Bron qilish modeli (Ixtiyoriy)**

- `id`: Unikal identifikator
- `user`: Foydalanuvchi modeli bilan bog‘langan
- `car`: Avtomobil modeli bilan bog‘langan
- `date`: Bron qilingan sana
- `status`: Holati (tasdiqlangan, bekor qilingan, kutilmoqda)
- `createdAt`: Bron qilingan vaqt

### 🔹 **Location modeli (Ixtiyoriy)**

- `id`: Unikal identifikator
- `car`: Avtomobil modeli bilan bog‘langan
- `latitude`: Avtomobil koordinatasi (kenglik)
- `longitude`: Avtomobil koordinatasi (uzunlik)
- `createdAt`: Joylashuv yangilangan vaqt

---

## 🔐 Autentifikatsiya va foydalanuvchi rollari

- **Admin**: Barcha resurslarni boshqarish huquqiga ega (avtomobillar, brendlar, Categorylar, foydalanuvchilar, buyurtmalar, to‘lovlar).
- **Foydalanuvchi**: Avtomobillarni ko‘rish, ijaraga olish yoki sotib olish, sharh qoldirish huquqiga ega.

### 🔹 Ro‘yxatdan o‘tish

```http
POST /api/auth/register
````

**Tanasi:**

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"password": "securepassword"
}
```

### 🔹 Kirish

```http
POST /api/auth/login
```

**Tanasi:**

```json
{
	"email": "john@example.com",
	"password": "securepassword"
}
```

Javob:

```json
{
	"token": "your_jwt_token"
}
```

Ushbu tokenni himoyalangan yo‘nalishlar uchun `Authorization` sarlavhasida ishlating.

---

## 📌 Kelajakdagi takomillashtirishlar

✅ Avtomobillar uchun rasm yuklash
✅ Ijara uchun to‘lov tizimi
✅ GraphQL qo‘llab-quvvatlashi
✅ AI asosida avtomobil tavsiyalarini yaratish

## 🤝 Hissa qo‘shish

Loyihaga o‘z hissangizni qo‘shish uchun pull request yuboring yoki muammo oching.

## 📜 Litsenziya

MIT Litsenziyasi © 2025 Avtomobil Boshqaruv API
