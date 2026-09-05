# U & I Printing — Designify Order Portal

A modern e-commerce platform for ordering custom designs and printing services, built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS**.

Live demo/business: [U & I Printing](https://www.uandiprinting.com)

## Features

- Browse and filter designs by category (categories dynamically loaded from Sanity)
- Search designs by title, description, and category
- Full design preview page with customization (specifications) and add-to-cart
- Shopping cart with quantity management and real-time price calculation
- "Send Requirements" flow:
  - With an empty cart → redirects to the Designs page
  - With items in the cart → navigates to the Cart page to email requirements to `uandiprinting@outlook.com`
- Click-to-WhatsApp phone link
- Responsive, mobile-first design
- Content managed entirely via Sanity CMS (homepage, about, contact, blog, designs, site settings)

## Tech Stack

- **React 18** + **Vite 5** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **React Router v6**
- **@tanstack/react-query** for data fetching
- **Sanity** (studio + client) for CMS
- **react-ga4** for Google Analytics

## Project Structure

This repo contains three sub-projects:

```
├── src/                  # Main frontend application
│   ├── pages/            # Page components (Index, About, Designs, DesignDetail, Cart, Blog, Contact)
│   ├── components/       # Reusable components + shadcn/ui primitives
│   ├── context/          # React context (Cart)
│   ├── hooks/            # Custom data hooks (useDesigns, useAbout, etc.)
│   ├── lib/              # Sanity client, notifications, utils, schemas
│   └── utils/            # Analytics tracker
├── sanity-studio/        # Sanity Studio (CMS) for the main site content
└── uandiadminportal/     # Secondary Sanity Studio (admin portal)
```

## Prerequisites

- Node.js 16+ (Vite 5 requires Node 18+ recommended)
- npm or yarn
- A [Sanity](https://www.sanity.io) account and project (optional for read-only)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/WilliamHankey/UandIPrinting.git
cd UandIPrinting
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

4. Add your environment variables (see below).

5. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:8080`.

## Environment Variables

The app reads the following environment variables (see `.env.example`):

| Variable | Required? | Description |
|----------|-----------|-------------|
| `SANITY_TOKEN` | Optional | Sanity read/write token. Only required if you perform authenticated writes. Public read queries work without it. |
| `REACT_APP_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`). Analytics are only initialized in production if this is set. |

> **Note on `SANITY_TOKEN`:** This variable intentionally has **no `VITE_` prefix**. It is read server-side at build time by `vite.config.ts` (`define`) and inlined into the browser bundle, so it is **not fully private** — it is still visible to anyone inspecting the deployed JS. It simply avoids the `VITE_` public naming prefix. For a truly private token you would need a Vercel serverless proxy (not currently implemented).

### Adding to Vercel

1. Connect the repo to Vercel (framework preset: **Vite**).
2. Add the following environment variables under **Settings → Environment Variables** (scope: Production / Preview / Development as needed):

```
SANITY_TOKEN=your_sanity_token_here
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> For Vercel, add these as **non-prefixed** environment variables (no `VITE_`). `SANITY_TOKEN` is consumed at build time by `vite.config.ts` via `define`. If you change the name, keep it in sync in both Vercel and `vite.config.ts`.

3. Redeploy. The build command is `npm run build` and the output directory is `dist`.

### Creating a Sanity token

- Go to [Sanity Manage](https://www.sanity.io/manage/personal/projects)
- Open your project → **API** tab
- (Optional) Create a token with read permissions (or read/write if you need it)

## Buying / Order Flow

1. Browse **Designs**, use **category filters** and **search**.
2. Click **Preview** to view the full design detail page, or **Select Options** to customize.
3. Customize specifications and click **Add to Cart**.
4. Click **Send Requirements** in the navbar:
   - If the cart is empty → goes to the Designs page.
   - If the cart has items → goes to the Cart page.
5. On the Cart page, click **Place Order** — this opens an email draft to `uandiprinting@outlook.com` (and a WhatsApp message) with your order details.

## Available Scripts

- `npm run dev` — starts the Vite dev server
- `npm run build` — builds for production (outputs to `dist/`)
- `npm run preview` — serves the production build locally

## Sanity Studio

To run the CMS locally:

```bash
cd sanity-studio
npm install
npm run dev
```

## License

This project is licensed under the MIT License.
