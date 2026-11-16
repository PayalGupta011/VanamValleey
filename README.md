# Vanam Valley — Luxury Forest Villas & Residences
**Balaghat, Madhya Pradesh, India**

A premium, modern, responsive real-estate web application and content management system for Vanam Valley — featuring 129 signature 3 BHK luxury forest villas and estate plots.

---

## 🌲 Brand Identity & Design System

- **Deep Forest Green:** `#004B3C` — Primary luxury brand color, hero backgrounds, primary actions.
- **Peach Cream:** `#F7D6B0` — Warm accents, eyebrow badges, subtle borders, highlights.
- **Ivory White:** `#F8F6F0` — Clean backgrounds, subtle cards, and section contrast.
- **Muted Gold:** `#B68B45` — Editorial accents, dividers, price highlights, and iconography.
- **Typography:**
  - Headings: *Cormorant Garamond* (Editorial luxury serif)
  - Body: *Inter* (Clean, high-legibility sans-serif)

---

## 🏗️ Project Architecture

```
Vanam valley/
├── backend/
│   ├── config/
│   │   ├── db.js             # Mongoose connection with IPv4/DNS timeout fix
│   │   ├── cloudinary.js     # Cloudinary SDK configuration
│   │   └── multer.js         # Memory storage & image type filter
│   ├── controllers/
│   │   ├── adminController.js     # Admin login, me, password change
│   │   ├── propertyController.js  # Public & Admin Property CRUD
│   │   ├── enquiryController.js   # Public submissions & admin lead tracker
│   │   ├── settingsController.js  # Dynamic CMS website settings
│   │   └── mediaController.js     # Cloudinary media uploads & gallery
│   ├── middleware/
│   │   └── auth.js           # JWT Bearer token verification
│   ├── models/
│   │   ├── Admin.js          # Admin account schema with bcrypt
│   │   ├── Property.js       # Villa/plot schema with auto-slug
│   │   ├── Enquiry.js        # Client consultation leads
│   │   ├── WebsiteSettings.js# Editable website content
│   │   └── Media.js          # Cloudinary asset metadata
│   ├── routes/               # Express REST routers
│   ├── scripts/
│   │   └── seed.js           # Database seeder with brochure content
│   ├── .env.example          # Environment variables template
│   └── server.js             # Express application entry
│
├── frontend/
│   ├── public/
│   │   └── logo.png          # Official Vanam Valley brand logo
│   ├── src/
│   │   ├── assets/           # Local assets
│   │   ├── components/
│   │   │   ├── admin/        # Protected admin layout & sidebar
│   │   │   ├── layout/       # Public Navbar, Footer
│   │   │   └── shared/       # PropertyCard, SectionHeading, EnquiryModal, States
│   │   ├── pages/
│   │   │   ├── admin/        # Login, Dashboard, Properties, Enquiries, Content, Media
│   │   │   ├── Home.tsx      # Priority hero, 129 villas highlights, amenities, location
│   │   │   ├── Properties.tsx# Live listing with type & status filters
│   │   │   ├── PropertyDetail.tsx # Dynamic route with gallery & enquiry form
│   │   │   ├── Locations.tsx # Balaghat setting & national park attractions
│   │   │   ├── Calculators.tsx # EMI, Investment, and Area Converter
│   │   │   ├── About.tsx     # Master plan story & verified brochure specifications
│   │   │   ├── Gallery.tsx   # Categorized image portfolio with lightbox
│   │   │   └── Contact.tsx   # Experience center contact & lead form
│   │   ├── services/
│   │   │   └── api.ts        # Unified API client & auth storage
│   │   ├── types/            # TypeScript interfaces
│   │   ├── App.tsx           # React Router & dynamic SEO title watcher
│   │   └── index.css         # Vanam Valley Design System
│   └── vite.config.ts        # Vite configuration with /api development proxy
│
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** v18+ installed
- **MongoDB Atlas** cluster active

### 2. Backend Setup
```powershell
cd "c:\Users\lenovo\OneDrive\Desktop\Vanam valley\backend"

# Ensure dependencies are installed
npm install

# Seed verified brochure data (Admin + 3 Initial Residences + Settings)
npm run seed

# Start Backend Server (runs on http://localhost:5000)
npm run dev
# or: node server.js
```

### 3. Frontend Setup
In a new terminal window:
```powershell
cd "c:\Users\lenovo\OneDrive\Desktop\Vanam valley\frontend"

# Ensure dependencies are installed
npm install

# Start Vite Development Server (runs on http://localhost:5173)
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🔐 Administrative Console (CMS)

- **Login URL:** `http://localhost:5173/admin/login`
- **Default Username:** `admin`
- **Default Email:** `admin@vanamvalley.com`
- **Default Password:** `Vanam@2026!`

> [!WARNING]
> **Change your password immediately** after your first login using the **Change Password** button in the admin navigation bar. Never commit production passwords to git.

### CMS Capabilities
1. **Overview:** Total villas, published status, new leads counter, and latest inquiries.
2. **Properties Management:** Create, edit, publish/unpublish, and delete villas or plots.
3. **Client Inquiries:** View lead details, update status (`new`, `contacted`, `follow-up`, `closed`), and delete records.
4. **Website Content:** Modify hero headlines, contact telephone, about section, amenities, and SEO metadata directly from the browser.
5. **Media Library:** Upload images to Cloudinary, organize into categories, and copy CDN URLs.

---

## 🌐 Production Deployment Guide

### A. Deploy Backend (Railway / Render / DigitalOcean)
1. Push your repository to GitHub (ensure `.env` is ignored).
2. Create a new Node.js Web Service on your hosting provider.
3. Set the Root Directory to `backend`.
4. Configure the Build Command: `npm install`
5. Configure the Start Command: `node server.js`
6. Set Environment Variables:
   - `PORT=5000`
   - `MONGO_URI=<your_mongodb_atlas_connection_string>`
   - `JWT_SECRET=<random_secret_32_characters>`
   - `CLOUDINARY_CLOUD_NAME=<your_cloud_name>`
   - `CLOUDINARY_API_KEY=<your_api_key>`
   - `CLOUDINARY_API_SECRET=<your_api_secret>`
   - `CLIENT_URL=https://your-frontend-domain.com`
7. Ensure your server IP is whitelisted in MongoDB Atlas Network Access (`0.0.0.0/0` for cloud hosts).

### B. Deploy Frontend (Vercel / Netlify)
1. Import the repository on Vercel or Netlify.
2. Set the Root Directory to `frontend`.
3. Framework Preset: `Vite`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Set Environment Variable:
   - `VITE_API_URL=https://your-backend-api-url.com/api`

---

## 🧪 Automated Test Suite

A 17-point integration test verified all endpoints:
- Public health check, properties list, property detail by slug, settings, enquiry submission.
- Admin authentication, invalid login rejection (401), protected route enforcement (401).
- Admin properties retrieval, creation, toggle publish, and deletion.
- Admin enquiry listing, status update, and deletion.
- Admin password modification and reversion.
- Production build compilation without errors.

