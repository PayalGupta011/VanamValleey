# 🚀 Vanam Valley — Full-Stack Deployment Guide
**Complete Step-by-Step Guide for GitHub, Netlify, and Cloud Backend (Render / Railway)**

---

## 📋 Architecture Overview

* **Frontend:** React 19 + Vite + TypeScript (Single Page Application)
  * Recommended Platform: **Netlify** (or Vercel)
  * Build Command: `npm run build`
  * Publish Directory: `dist`
  * Redirects Rule: `/* /index.html 200` (Pre-configured in `netlify.toml` & `frontend/public/_redirects`)

* **Backend:** Node.js + Express + MongoDB Atlas + Cloudinary
  * Recommended Platform: **Render.com** (or Railway / AWS / VPS)
  * Root Directory: `backend`
  * Build Command: `npm install`
  * Start Command: `npm start` (or `node server.js`)

---

## 1️⃣ STEP 1: Push Code to GitHub

Aapka local repository initialize ho chuka hai aur `.gitignore` properly configured hai (`.env`, `node_modules`, `dist` automatically ignored hain).

Terminal (PowerShell) me ye commands run karein:

```bash
# 1. Check status
git status

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete luxury Vanam Valley fullstack application"

# 4. Set branch to main
git branch -M main

# 5. Link your GitHub repository (replace with your actual GitHub repo URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 2️⃣ STEP 2: Deploy Backend (Render.com)

Render backend APIs host karne ke liye free aur robust platform hai.

1. **Render.com** par jayein aur GitHub account se sign in karein.
2. Click **New +** -> **Web Service**.
3. Apna GitHub repository connect karein.
4. Settings fill karein:
   * **Name:** `vanam-valley-backend`
   * **Root Directory:** `backend`
   * **Environment:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
5. **Environment Variables** add karein (**Add Environment Variable** button se):
   * `PORT`: `5000` (ya Render auto-set karega)
   * `MONGO_URI`: `mongodb+srv://...` (Aapka MongoDB Atlas connection string)
   * `JWT_SECRET`: `VanamValley@SecureJWTSecretKey2026!` (min 32 chars)
   * `CLOUDINARY_CLOUD_NAME`: (Aapka Cloudinary Cloud Name)
   * `CLOUDINARY_API_KEY`: (Aapka Cloudinary API Key)
   * `CLOUDINARY_API_SECRET`: (Aapka Cloudinary API Secret)
   * `CLIENT_URL`: `*` (ya deployment ke baad apna Netlify URL add kar sakte hain)
6. Click **Deploy Web Service**.
7. Deploy hone ke baad Render aapko ek URL dega (e.g. `https://vanam-valley-backend.onrender.com`).
   * Test URL: `https://vanam-valley-backend.onrender.com/` (ye `"Vanam Valley API is running"` return karega).

> [!IMPORTANT]
> **MongoDB Atlas Network Access:**
> MongoDB Atlas dashboard me jayein -> **Network Access** -> **IP Access List** -> Ensure karein ki `0.0.0.0/0` (Allow access from anywhere) enabled ho, taaki Render ka cloud server database connect kar sake.

---

## 3️⃣ STEP 3: Deploy Frontend (Netlify)

1. **Netlify.com** par login karein.
2. Click **Add new site** -> **Import an existing project** -> **GitHub**.
3. Select your `Vanam Valley` repository.
4. Netlify automatically root ke `netlify.toml` ko detect kar lega:
   * **Base directory:** `frontend`
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
5. Click **Environment variables** (Deploy se pehle ya Site configuration me):
   * Key: `VITE_API_URL`
   * Value: `https://vanam-valley-backend.onrender.com/api` (Render backend URL ke aage `/api` lagayein)
6. Click **Deploy Vanam Valley**.

Netlify 1 minute me website live kar dega!
Example Live URL: `https://vanam-valley.netlify.app`

---

## 4️⃣ Production Verification Checklist

| Item | Status / Action |
| :--- | :--- |
| **All Routes Accessible** | `/`, `/about`, `/contact`, `/locations`, `/calculators`, `/admin/login` |
| **Page Refresh (SPA Routing)** | `netlify.toml` and `_redirects` ensure page refresh never gives 404 |
| **Backend Connection** | Frontend `VITE_API_URL` connects to deployed Render API |
| **Admin Login** | Login with `admin@vanamvalley.com` / `Vanam@2026!` |
| **Image Uploads** | Cloudinary integration ensures images persist permanently |
| **Lead Submissions** | Enquiries & Site Visit bookings save directly to MongoDB Atlas |

---

## 5️⃣ Common Troubleshooting

* **Issue: "Route not found" on page refresh in Netlify**
  * *Solution:* `frontend/public/_redirects` already exists with `/* /index.html 200`. It ensures React Router handles all sub-routes.
* **Issue: CORS error in browser console**
  * *Solution:* In `backend/server.js`, permissive CORS is pre-configured for all `.netlify.app` and `.vercel.app` origins. Optionally set `CLIENT_URL` in backend env to your exact Netlify domain.
* **Issue: MongoDB connection timeout on Render**
  * *Solution:* In MongoDB Atlas -> Network Access -> Add IP `0.0.0.0/0`.
