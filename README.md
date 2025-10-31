
# Seatre: Nuxt 4 + Express Fullstack Project

## Tech Stack

- **Frontend:** Nuxt 4 (Vue 3, Vite, JavaScript)
- **Styling:** Tailwind CSS, Nuxt UI
- **Backend:** Express (Node.js)
- **DevOps:** Docker, Docker Compose, cPanel/WHC

---

## Project Structure

- `/frontend` – Nuxt 4 SSR frontend
- `/server` – Express backend API

---

## Local Development

### 1. Prerequisites

- Node.js (LTS recommended)
- Docker & Docker Compose (for containerized dev)
- MySQL (or use Docker service)

### 2. Environment Files

- `.env` (root): Used by Docker Compose for local dev (contains both frontend and backend variables)
- `frontend/.env.production`: Used for Nuxt production build (do NOT ignore in Docker build)
- `server/.env.production`: Used for Express backend in production (injected at runtime, can be ignored in Docker build)
- `.env.example`: Template for developers (never use real secrets)

**Key variables:**
- `FRONTEND_URL=http://localhost:3000` (dev) or your production domain (prod)
- `DB_HOST=mysql`, `DB_USER=root`, `DB_PASSWORD=...`, `DB_NAME=...`
- `JWT_SECRET=...` (use a unique, strong value for production; do NOT reuse dev secret)
- `NUXT_PUBLIC_API_BASE=http://localhost:3001/api` (dev) or your backend URL (prod)

---

## Nuxt 4 Minimal Starter

Look at the [Nuxt 4 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

---

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.


## Setup

Make sure to install the dependencies in both `/frontend` and `/server`:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```


## Development Server

Start the development server on `http://localhost:3000` (Nuxt) and `http://localhost:3001` (Express):

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```


## Production

Build the application for production (Nuxt):

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```


Locally preview production build (Nuxt):

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Deploying to WHC/cPanel (frontend + backend)

This project runs as two Node.js apps in cPanel: a Nuxt SSR frontend and an Express API backend.

### Version Control & Deployment
- In cPanel, use Git Version Control to clone this repo into `/home/USER/apps/seatre` (recommended), or upload files via File Manager/FTP.

### Backend (Express API)
- cPanel → Setup Node.js App → Create
	- App root: `apps/seatre/server`
	- Startup file: `index.js`
	- Node version: choose the default available
	- **Environment variables (set in cPanel UI, not from .env files!):**
		- `NODE_ENV=production`
		- `PORT=3001`
		- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
		- `JWT_SECRET` (use a unique, strong value for production)
		- `FRONTEND_URL=https://your-frontend-domain`
	- Click Run NPM Install, then Restart Application

### Frontend (Nuxt SSR)
- cPanel → Setup Node.js App → Create
	- App root: `apps/seatre/frontend`
	- Startup file: `server.cjs`
	- **Environment variables:**
		- `NODE_ENV=production`
		- `NUXT_PUBLIC_API_BASE=https://api.your-domain` (or your backend URL)
	- For Docker builds, make sure `frontend/.env.production` is present and NOT in `.dockerignore`.
	- Click Run NPM Install
	- Click Run JS Script → choose `build`
	- Restart Application

### Domains and Routing
- Point the main domain to the frontend app.
- Use a subdomain (e.g., `api.your-domain`) for the backend.

### Updating Deployments
- In Git Version Control, Pull latest changes.
- For frontend: run `build` again, then Restart Application.
- For backend: Restart Application.

---

## Notes & Best Practices

- Backend CORS uses `FRONTEND_URL` and sets credentials. Ensure the frontend domain matches exactly (protocol + host).
- In local dev, `/api` is proxied by Vite. In production, `NUXT_PUBLIC_API_BASE` controls the API base.
- **Do NOT use the same JWT_SECRET for dev and prod. Generate a new, strong secret for production.**
- Only `.env.example` should be committed with placeholder/example values. **Never commit real secrets.**
- For more, see the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment).
