# CREATExCONNECTxCOLLAB

A portfolio website where artists can showcase their work, discover other creators, and connect with each other - all with live updates!

Built for SparkHacks 2026.

---

## What It Does

This is a platform for creative people to:

- **Create portfolios** - Upload images, videos, PDFs, and scripts all in one place
- **Browse other creators** - See what other artists are working on
- **Follow people** - Follow creators you like and see their follower count update live
- **Post blogs** - Share updates about your creative journey
- **Real-time updates** - Everything updates instantly without refreshing the page

Think of it as a mix between a portfolio site and a social network, but specifically for creative work.

---

## Tech Stack

We built this using:

- **Frontend**: React + Vite (for the website interface)
- **Backend**: Python + Flask (handles the server stuff)
- **Database**: PostgreSQL (stores all the data)
- **Real-time**: Socket.IO (makes updates instant)

---

## How to Run It

### What You Need First

Make sure you have these installed:
- Node.js
- Python
- PostgreSQL

### Steps to Get It Running

**1. Set up PostgreSQL**
   - Make sure PostgreSQL is running on port 4000
   - Create a database called `sparkhacksdb`

**2. Start the Backend** (in one terminal)
   ```bash
   cd my-react-app/Backend
   source venv/bin/activate
   python main.py
   ```
   The backend will start on port 5001.

**3. Start the Frontend** (in another terminal)
   ```bash
   cd my-react-app
   npm install
   npm run dev
   ```
   The frontend will start on port 5173.

**4. Open the App**
   - Go to `http://localhost:5173` in your browser
   - You should see the homepage!

---

## Project Structure

Here's where everything is:

```
my-react-app/
├── Backend/
│   ├── main.py              # All the backend code
│   └── venv/                # Python environment
│
├── src/
│   ├── Pages/               # Different pages (Login, Dashboard, etc.)
│   │   ├── MainPage.jsx     # Home page with all portfolios
│   │   ├── Creators.jsx     # Browse creators page
│   │   ├── Dashboard.jsx    # Your personal dashboard
│   │   ├── Login.jsx        # Login page
│   │   └── SignUp.jsx       # Signup page
│   │
│   ├── Components/          # Reusable UI pieces
│   │   ├── MasonryGrid.jsx  # Grid layout for portfolios
│   │   └── PortfolioCard.jsx # Cards that show portfolio items
│   │
│   ├── Styles/              # All the CSS files
│   └── Socket.js            # Connects frontend to backend
│
└── package.json             # Lists all npm packages
```

### What Each Main File Does

**Backend (Backend/main.py)**
- Sets up the database (users, portfolios, blogs)
- Handles login and signup
- Manages portfolios and blog posts
- Sends real-time updates to everyone

**Frontend Pages**
- `MainPage.jsx` - Shows all portfolios in a grid
- `Creators.jsx` - List of all creators on the platform
- `Dashboard.jsx` - Your personal page where you can post blogs
- `Login.jsx` & `SignUp.jsx` - Authentication pages

**Socket.js**
Simple 3-line file that connects the frontend to the backend:
```javascript
import { io } from "socket.io-client";
const socket = io("http://localhost:5001");
export default socket;
```

---

## How It Works (Simple Version)

1. **You visit the site** → See all portfolios on the home page
2. **Click on a creator** → View their full portfolio with all their work
3. **Sign up/Login** → Get access to your dashboard
4. **Post a blog** → Everyone sees it instantly (no refresh needed!)
5. **Follow someone** → Their follower count updates live for everyone

Everything happens in real-time because we use Socket.IO to keep the frontend and backend constantly connected.

---

## Database Setup

The database has these main tables:
- **Users** - Creator accounts
- **Portfolios** - Each user can have a portfolio
- **PortfolioItems** - Individual pieces in a portfolio (images, videos, etc.)
- **Blogs** - Blog posts
- **Followers** - Who follows who

The backend (`main.py`) creates all these tables automatically when you first run it!

---

## Features We're Proud Of

- Real-time everything (no page refreshes needed)
- Support for multiple content types in portfolios
- Clean, simple interface
- Follow system that works instantly
- Personal dashboards for each user

---

## Team

Built during SparkHacks 2026 by a team that learned a lot about real-time web apps!

---

## Tips for Running/Testing

- **Port conflicts?** Make sure nothing else is using ports 5001 or 5173
- **Database errors?** Check that PostgreSQL is running and the database exists
- **Frontend not connecting?** Make sure the backend is running first
- **Want to reset the database?** Just delete it and restart the backend - it'll recreate everything

---

## Notes

This was a hackathon project, so some parts are a bit rough around the edges. But the core features work and it was a great learning experience!
