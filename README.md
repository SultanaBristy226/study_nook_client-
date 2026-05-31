# StudyNook — Library Study Room Booking Platform

🔗 **Live Site:** [https://study-nook-client-46py.vercel.app/](https://study-nook-client-46py.vercel.app/)

## About StudyNook

StudyNook is a full-stack library study room booking platform where students can discover available study rooms, make reservations, manage their own room listings, and track bookings — all through a clean, responsive interface with dark mode support.

## Key Features

- 🔐 **Secure Authentication System** — Email/password and Google OAuth login powered by Firebase, with JWT tokens stored in HTTPOnly cookies to protect all private API routes from unauthorized access
- 🏫 **Full Room Listing Management** — Logged-in users can add new study rooms, update existing ones, and delete their own listings — full CRUD operations backed by MongoDB
- 📅 **Smart Booking System** — Users can book any available room by selecting date and time, view their complete booking history, and cancel bookings anytime from the My Bookings page
- 🔍 **Search and Filter** — Search rooms by name using MongoDB `$regex` operator for partial matching, filter by amenities, floor, and hourly rate range for instant results
- 🌙 **Dark Mode** — Fully supported dark/light theme toggle with smooth transitions, persisted via localStorage
- 📱 **Fully Responsive Design** — Optimized for all screen sizes including mobile, tablet, and desktop

## Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 | Node.js |
| React Router v6 | Express.js |
| Tailwind CSS | MongoDB Atlas |
| Firebase Auth | JWT + Cookies |
| Axios | Cookie-Parser |
| Framer Motion | Dotenv |
| React Hot Toast | CORS |

## Pages

- **Home** — Banner, Featured Rooms, How It Works, Why StudyNook section
- **Rooms** — All study rooms with search and filter by amenities, floor, price
- **Room Details** — Full room info with Book Now button
- **Add Room** — Private form to list a new study room
- **My Bookings** — View and cancel your reservations
- **My Rooms** — Manage your own room listings
- **Login / Register** — Auth pages with Google OAuth login
- **404 Page** — Custom not found page

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Firebase project

### Client Setup
```bash
git clone <your-client-repo-url>
cd client
npm install
cp .env.example .env
# Fill Firebase config in .env
npm run dev
```

### Server Setup
```bash
git clone <your-server-repo-url>
cd server
npm install
cp .env.example .env
# Fill MongoDB URI and JWT secret in .env
npm run dev
```

### Environment Variables

#### Client (`.env`)
```
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Server (`.env`)
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```
## Deployment

- **Client:** Deployed on [Vercel](https://vercel.com) — set `VITE_API_URL` to your server Vercel URL + `/api`
- **Server:** Deployed on [Vercel](https://vercel.com) — set `CLIENT_URL` to your client Vercel URL, `NODE_ENV` to `production`
- **Database:** MongoDB Atlas — enable Network Access for `0.0.0.0/0` for Vercel serverless deployment
- **Firebase:** Add your Vercel client domain to Firebase → Authentication → Authorized Domains
