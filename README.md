# 🚀 YC Directory – Discover and Submit Startups

![YC Directory Banner](./public/yc.png)

> A modern, full-stack startup discovery platform powered by **Next.js**, **Sanity**, **Tailwind CSS**, and **Sentry**.

YC Directory is a platform that allows users to explore, submit, like, and bookmark startups. It mimics platforms like Product Hunt or YC’s own startup list, giving users the ability to discover startups by category or popularity. Authenticated users can contribute new startup entries with rich markdown-based pitches, like and bookmark others' startups, and view their own liked/bookmarked content under their profile.

Built using the **latest Next.js features**, the app uses a hybrid rendering strategy:

- **Server-Side Rendering (SSR)** for personalized content like user dashboards
- **Incremental Static Regeneration (ISR)** for performant content caching
- **Client-Side Rendering (CSR)** where interactions like likes and bookmarks need instant updates

The stack ensures fast load times, responsive UI, and seamless developer experience with strong error monitoring and flexible content management.

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity.io-F03?logo=sanity)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?logo=sentry&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-111827?logo=react&logoColor=white)

---

## ✨ Features

- 🔍 Search startups by **title** or **category**
- 📝 Submit new startups with **markdown-based rich pitch editor**
- 🖼️ Upload startup **images** and categorize them
- ✅ Strong **form validation** using Zod
- 🔐 **User authentication** via GitHub (NextAuth.js)
- ❤️ **Like** and 📌 **Bookmark** startups with real-time feedback
- 📄 View **My Likes** and **My Bookmarks** under your profile
- 👤 Each startup includes **author name and avatar**, linked to their profile
- ⚡ **Fast performance** via SSR, ISR, and CSR where appropriate
- 📷 **Full error monitoring** and stack tracing via Sentry
- 📱 Fully **responsive** modern UI with Tailwind and Shadcn UI

---

## 🧠 About Sanity & Sentry

### 📊 Sanity

Sanity is a headless CMS that provides real-time content editing, flexible schema, and powerful GROQ queries.

**Used for:**

- Managing startup submissions
- Fetching enriched content with author and stats
- Querying likes, bookmarks, and categories

### 🛡️ Sentry

Sentry is a full-stack monitoring platform used to detect and fix errors across the application.

**Used for:**

- Monitoring both client-side and server-side errors
- Logging form issues, query failures, or auth-related bugs
- Improving user experience via early bug reporting

---

## ⚙️ Running Locally

**1. Clone the repository**  
`git clone https://github.com/your-username/yc-directory.git`  
`cd yc-directory`

**2. Install dependencies**  
`npm install`

**3. Set up environment variables**  
Create a `.env.local` file and add the following:

- `NEXTAUTH_SECRET=your_secret`
- `NEXTAUTH_URL=http://localhost:3000`
- `SANITY_PROJECT_ID=your_sanity_project_id`
- `SANITY_DATASET=production`
- `SANITY_API_VERSION=2023-06-01`
- `SANITY_TOKEN=your_sanity_token`
- `SENTRY_AUTH_TOKEN=your_sentry_token`

**4. Run the app**  
`npm run dev`

---

## 📂 Folder Structure Highlights

- `app/` – App Router-based structure using modern file-based routing
- `components/` – Reusable UI components (using Shadcn UI + custom)
- `lib/` – Utilities: data fetching, auth, enrichment, and formatting
- `sanity/` – CMS config, client setup, and GROQ queries
- `auth/` – NextAuth config with JWT mapping and session callbacks

---

## 🙌 Contributing

Pull requests are welcome! If you have ideas to improve features, design, or performance, feel free to fork the repo and submit your suggestions.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js
