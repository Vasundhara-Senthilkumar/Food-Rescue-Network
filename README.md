# 🍱 Food Rescue Network

**Surplus food, zero waste.** Connecting food providers with NGOs and volunteers to redistribute surplus food before it goes to waste.

Built for **DevCrest Buildathon 2026** — Team 79 (Vasundhara S, Akshath Manoj, Giri Aditya)

---

## 📌 Problem Statement

Edible food is discarded daily by restaurants, hostels, canteens, and households — while nearby NGOs and volunteers could use it to feed people in need. The real challenge isn't awareness, it's **coordination and timing**. Food spoils fast, and by the time an NGO discovers a donation, it's often too late.

## 💡 Our Solution

Food Rescue Network connects **Providers → NGOs/Volunteers → People in Need** through a simple, fast platform:

- Providers list surplus food with quantity, food type, location, and expiry time
- Every listing shows a **live urgency badge** (Urgent / Claim Soon / Time Available) based on time remaining until expiry — helping NGOs prioritize what to claim first
- NGOs and volunteers claim listings in one click
- Status is tracked end-to-end: **Pending → Accepted → Completed**
- Both roles get dashboards with live impact metrics and history

## ✨ Core Features

**For Providers:**
- Add food listings with title, description, quantity, food type (Veg/Non-veg/Both), location, and expiry time
- View all listings and who received each donation
- Track own listings under "My Listings"
- Dashboard with live metrics: meals redistributed, CO2 saved, people fed, provider→NGO match rate
- Visual breakdowns: meals over time, food type split, social reach by zone

**For NGOs/Volunteers:**
- Browse nearby available food listings
- See urgency badges to prioritize time-sensitive donations
- Claim listings with one click ("Accept Pickup")
- Track own claimed pickups
- Mark pickups as completed once collected

**Shared:**
- JWT-based authentication with role-based access (Provider / NGO)
- Real-time status sync between provider and NGO views

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT + bcryptjs |
| Config | dotenv |
| Dev tooling | nodemon |

Built on top of an existing food-redistribution codebase, extended for this problem statement with: the claim/accept request workflow, food type field, and expiry-based urgency scoring.

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB connection string (Atlas or local)

### Backend Setup
```bash
git clone https://github.com/Vasundhara-Senthilkumar/Food-Rescue-Network.git
cd Food-Rescue-Network
npm install
```

Create a `.env` file in the root with:
