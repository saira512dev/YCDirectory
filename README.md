# 🚀 YC Directory – Discover and Submit Startups

![YC Directory Banner](./public/liveApp.png)

> A modern startup listing platform built with **Next.js**, **Sanity**, **Tailwind CSS**, and **Sentry**.

🔗 **Live Demo:** [https://directoryofstartups.netlify.app](https://directoryofstartups.netlify.app)

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity.io-F03?logo=sanity)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?logo=sentry&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-111827?logo=react&logoColor=white)

---

✨ Features
🔍 Search Startups by title or category

📝 Submit startups with markdown-based pitch

🖼️ Upload startup images and categorize them

✅ Form validation using Zod

🔐 User authentication with NextAuth.js

📷 Sentry for error monitoring (client + server)

⚡ Responsive, fast, and fully dynamic UI

📦 Uses both SSR (Server-Side Rendering) and ISR (Incremental Static Regeneration) for optimal performance and freshness

🧠 About Sanity & Sentry
📊 Sanity
Sanity is a headless CMS that lets you manage structured content easily via a flexible schema and real-time collaborative Studio interface.

Used here for storing and fetching dynamic startup content.

🛡️ Sentry
Sentry helps developers monitor and fix errors in real time by providing detailed error logs, stack traces, and performance metrics for both frontend and backend.

Used here to track client and server errors with full visibility.

⚙️ Running Locally
Clone the repo

git clone https://github.com/your-username/yc-directory.git
cd yc-directory

Install dependencies
npm install

Set up environment variables
Create a .env.local file and add:
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
SANITY_PROJECT_ID=your_sanity_id
SANITY_DATASET=production
SANITY_API_VERSION=2023-06-01
SANITY_TOKEN=your_sanity_token
SENTRY_AUTH_TOKEN=your_sentry_token

Run the app
npm run dev
