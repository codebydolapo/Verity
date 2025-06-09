# Verity: E-commerce Product Discovery Platform

## 📚 Table of Contents

* [About Verity](#about-verity)
* [Features](#features)
* [Technical Architecture](#technical-architecture)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Image Host Configuration](#image-host-configuration)
  * [Running the Development Server](#running-the-development-server)
* [Project Structure](#project-structure)
* [Key Components & Custom Hooks](#key-components--custom-hooks)
* [API Interaction & Data Flow](#api-interaction--data-flow)
* [Styling & Aesthetics](#styling--aesthetics)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

---

## 🛍️ About Verity

**Verity** is a modern and responsive e-commerce product discovery platform built with **Next.js**. It delivers a seamless shopping experience by enabling users to explore top-selling items, perform product searches, and view detailed product information — all in real-time using Amazon’s product data via RapidAPI.

It employs intelligent client-side caching strategies to reduce API calls, manage quota limits, and provide faster load times.

---

## 🚀 Features

* **Curated Bestsellers:** Homepage showcases top-selling items in categories like Electronics, Books, and Fashion.
* **Global Search:** A universal search bar enables keyword-based product search.
* **Paginated Results:** Dynamically renders search results with pagination support.
* **Product Detail Pages:** Each product links to a dedicated page with complete details (price, ratings, specs, etc.).
* **Client-side Caching:** Reduces redundant API calls using `sessionStorage` to cache:

  * Bestseller lists
  * Search results (per page)
  * Product detail responses
* **Quantity Selector:** Interactive control for choosing item quantity.
* **Action Buttons:** “Add to Cart” and “Buy Now” buttons (placeholders for future integration).
* **Wishlist & Alternatives:** Additional product interaction options to increase user engagement.
* **Responsive UI:** Tailwind CSS ensures mobile-first design and cross-device compatibility.
* **Refined Aesthetics:** Visually appealing product cards with hover effects and badges.

---

## 🧱 Technical Architecture

* **Next.js App Router:** Utilizes dynamic routing (e.g., `/products/[asin]`, `/search/[query]`) for SEO and structured navigation.
* **Client Components:** Pages and components that rely on state and effects are explicitly marked using `"use client"`.
* **Custom Hooks:** Abstraction for API interactions, loading states, and caching via:

  * `useBestsellers`
  * `useSearchResults`
  * `useProductDetails`
* **API Integration:** Connects to the [Real-Time Amazon Data API](https://rapidapi.com) via RapidAPI, using secure environment variables.
* **Image Optimization:** Leverages Next.js `Image` component for efficient rendering and lazy loading.

---

## 🛠️ Technologies Used

* **Next.js 14+** (App Router)
* **React & TypeScript**
* **Tailwind CSS**
* **Lucide React** (icons)
* **RapidAPI** (Amazon product data)
* **fetch API** (network requests)
* **sessionStorage** (temporary client-side caching)

---

## ⚙️ Getting Started

### ✅ Prerequisites

* Node.js v18+
* npm or yarn

### 📦 Installation

```bash
git clone <your-repository-url>
cd verity

# Install dependencies
npm install
# or
yarn install
```

### 🔐 Environment Variables

Create a `.env.local` file at the root and add:

```
NEXT_PUBLIC_RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY_HERE
```

> **Note:** Host and base URL (`real-time-amazon-data.p.rapidapi.com`) are hardcoded in `src/lib/fetchProducts.ts`. You may externalize them as needed.

### 🖼️ Image Host Configuration

In `next.config.js`, allow Amazon's CDN for image optimization:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

### 🧪 Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
verity/
├── public/              # Static assets
├── src/
│   ├── app/             # App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   └── [asin]/page.tsx
│   │   └── search/
│   │       └── [id]/page.tsx
│   ├── components/      # UI components
│   │   ├── ProductCard.tsx
│   │   ├── GridOption.tsx
│   │   ├── Header.tsx
│   │   └── ui/          # Shadcn components
│   ├── hooks/           # Custom React hooks
│   │   ├── useBestsellers.ts
│   │   ├── useSearchResults.ts
│   │   └── useProductDetails.ts
│   ├── lib/
│   │   └── fetchProducts.ts
│   ├── types/
│   │   └── types.ts
│   └── globals.css      # Tailwind & global styles
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .env.local
└── package.json
```

---

## 🧩 Key Components & Custom Hooks

### `components/Header.tsx`

* Site navigation with search input and user icons.
* Uses `useRouter` for client-side navigation.

### `components/ProductCard.tsx`

* Reusable product display component with:

  * Image hover effects
  * Price and discount formatting
  * "Best Seller" badge
  * Links to `/products/[asin]`

### Custom Hooks

* `useBestsellers.ts`: Fetches and caches category-based bestsellers.
* `useSearchResults.ts`: Handles paginated search queries and caching.
* `useProductDetails.ts`: Fetches full product data by ASIN and caches it.

### `lib/fetchProducts.ts`

* Centralized API utility with consistent headers, error handling, and response parsing.

### `types/types.ts`

* Type definitions for:

  * `BestsellerProduct`, `SearchProduct`, `ProductDetailsData`
  * Associated API response types for safety and intellisense.

---

## 🔄 API Interaction & Data Flow

1. **Trigger:** User action (e.g., search, navigation) initiates data fetch.
2. **Hook:** Relevant custom hook is called.
3. **Cache Check:** Hook looks up `sessionStorage` for cached results.
4. **Cache Hit:** Uses cached data to update UI instantly.
5. **Cache Miss:** Calls `fetchProducts.ts` to request new data.
6. **Fetch:** Constructs request with headers and API key.
7. **Response:** Parses response or handles errors.
8. **Update:** Updates component state and caches result.

---

## 🎨 Styling & Aesthetics

* **Tailwind CSS:** Provides utility-first, responsive styling.
* **Clean Layouts:** Grid and flex layouts ensure a polished UX.
* **Typography:** Clear font sizing and spacing for readability.
* **Animations:** Smooth hover states, shadows, and transitions.
* **Image Optimization:** Uses `next/image` for fast and responsive image loading.

---

## ☁️ Deployment

You can deploy Verity using platforms like **Vercel** (recommended) or **Netlify**.

### Deploying on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, etc.).
2. Import the repository into [Vercel](https://vercel.com).
3. Set environment variables (`NEXT_PUBLIC_RAPIDAPI_KEY`) in the Vercel dashboard.
4. Deploy.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, open issues, or submit PRs to improve functionality, fix bugs, or enhance the UI.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---
