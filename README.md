# DanaFly

## DanaFly is a modern, full-featured travel and tourism management platform designed to connect tourists with verified tour guides, explore curated travel packages, book unforgettable trips, and share experiences through stories and photos. With secure user authentication, real-time bookings, role-based dashboards, and Stripe-powered payments, DanaFly offers a seamless and personalized travel planning experience for both travelers and tour operators.

## Live Site

🔗 [DanaFly Live Site](https://danafly-acbb0.web.app)

---

## key Features

### login and register:

By Creating and managing user can find the subsciptions as they want.
🔐 User Authentication

- Secure login/register with JWT tokens stored in cookies

- Google Sign-In integration

- Role-based access (Tourist, Tour Guide, Admin)

### 🗺️ Tour Package Booking**

- Explore detailed travel packages with images and pricing

- Book tours with real-time availability

- Integrated payment system via Stripe

### 🧑‍💼 Tour Guide System**

- Verified tour guides can list their services

- Tourists can meet and book available guides

- Guide profiles with ratings and reviews

### 📸 Story & Photo Sharing**

- Users can share travel stories and photo galleries

- Latest images displayed on homepage

- 'See More' gallery with full user contributions

### 🧭 Dashboards for All Roles**

- Tourist Dashboard: View bookings, payments, and saved trips

- Guide Dashboard: Manage bookings, availability, and feedback

- Admin Dashboard: Manage users, verify roles, and moderate content

### 📧 Forgot Password Functionality**

- Password reset via email using Firebase Auth

- Toast notifications for success/failure feedback

### 🧾 Cookie-Based JWT Auth**

- Secure and persistent login sessions

- Admin routes protected via custom middlewares and hooks

### 📊 Admin Panel**

- Role management (promote user to admin or guide)

- View analytics, user stats, and content moderation

### 🎨 Responsive & Modern UI**

- Built with React + Tailwind CSS
- Fully responsive for mobile and desktop users
- Clean design, animations, and interactive elements

---

## Tech Stack

#### Frontend**:
- React.js – Component-based UI development
- Tailwind CSS – Utility-first styling for responsive design
- React Router – Client-side routing
- Axios – HTTP client for API communication
- React Hook Form – Form handling and validation
- React Query (@tanstack/react-query) – Data fetching and caching
- React Icons – Iconography
- React Toastify – Notifications and alerts
#### Authentication**:
- Firebase Authentication – Email/password and Google OAuth
- JWT (JSON Web Tokens) – Secure access tokens stored in HTTP-only cookies
#### Backend**:
- Node.js + Express.js – RESTful API development
- MongoDB + Mongoose – NoSQL database for storing users, bookings, packages, etc.
- Cookie-Parser – Middleware for parsing cookies
- Dotenv – Environment variable management
- Cors – Cross-origin resource sharing configuration
#### Payment Integration**
- Stripe API – Secure and easy-to-integrate payment processing

#### Deployment**

- Vercel – Hosting the frontend
- Render / Railway / Vercel Functions – Hosting the backend API
- MongoDB Atlas – Cloud-hosted MongoDB database

### npm packages

## Dependencies

Here are the key dependencies required for this project:

### **Dependencies**

- `"@react-hook/window-size": "^3.1.1",`
- `"@stripe/react-stripe-js": "^3.7.0",`
- `"@stripe/stripe-js": "^7.4.0",`
- `"@tailwindcss/vite": "^4.1.11",`
- `"@tanstack/react-query": "^5.82.0",`
- `"axios": "^1.10.0",`
- `"firebase": "^11.10.0",`
- `"framer-motion": "^12.23.9",`
- `"lottie-react": "^2.4.1",`
- `"react": "^19.1.0",`
- `"react-confetti": "^6.4.0",`
- `"react-countup": "^6.5.3",`
- `"react-datepicker": "^8.4.0",`
- `"react-dom": "^19.1.0",`
- `"react-hook-form": "^7.60.0",`
- `"react-icons": "^5.5.0",`
- `"react-intersection-observer": "^9.16.0",`
- `"react-photo-album": "^3.1.0",`
- `"react-router": "^7.6.3",`
- `"react-select": "^5.10.2",`
- `"react-share": "^5.2.2",`
- `"react-tabs": "^6.1.0",`
- `"react-toastify": "^11.0.5",`
- `"react-use": "^17.6.0",`
- `"sweetalert2": "^11.22.2",`
- `"swiper": "^10.0.0",`
- `"tailwindcss": "^4.1.11",`
- `"yet-another-react-lightbox": "^3.24.0"`

### **Dev Dependencies**

- `"@tailwindcss/vite": "^4.1.8",`
- `"axios": "^1.10.0",`
- `"firebase": "^11.9.1",`
- `"framer-motion": "^12.16.0",`
- `"lottie-react": "^2.4.1",`
- `"motion": "^12.16.0",`
- `"react": "^19.1.0",`
- `"react-datepicker": "^8.4.0",`
- `"react-dom": "^19.1.0",`
- `"react-icons": "^5.5.0",`
- `"react-router": "^7.6.2",`
- `"react-simple-typewriter": "^5.0.1",`
- `"react-toastify": "^11.0.5",`
- `"react-tooltip": "^5.29.0",`
- `"sweetalert2": "^11.22.0",`
- `"tailwindcss": "^4.1.8"`

### **Development Dependencies**

- `"@eslint/js": "^9.30.1",`
- `"@types/react": "^19.1.8",`
- `"@types/react-dom": "^19.1.6",`
- `"@vitejs/plugin-react": "^4.6.0",`
- `"daisyui": "^5.0.46",`
- `"eslint": "^9.30.1",`
- `"eslint-plugin-react-hooks": "^5.2.0",`
- `"eslint-plugin-react-refresh": "^0.4.20",`
- `"globals": "^16.3.0",`
- `"vite": "^7.0.3"`

Refer to `package.json` for a complete list of dependencies.

---

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone clint https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-MISFOfficial
   ```

   ```bash
   git clone server https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-MISFOfficial
   ```

2. Navigate to the project directory:

   ```bash
   cd danafly
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---
