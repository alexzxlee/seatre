Split architecture: Nuxt 3 frontend + Express backend

Run in Docker:
- docker-compose up --build
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

Environment:
- FRONTEND_URL=http://localhost:3000
- DB_HOST=mysql, DB_USER=root, DB_PASSWORD=..., DB_NAME=...
- JWT_SECRET=...
# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

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

Start the development server on `http://localhost:3000`:

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

Build the application for production:

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

Locally preview production build:

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

- Version control: In cPanel, use Git Version Control to clone this repo into `/home/USER/apps/seatre` (recommended), or upload files via File Manager/FTP.

Backend (Express API)
- cPanel → Setup Node.js App → Create
	- App root: `apps/seatre/server`
	- Startup file: `index.js`
	- Node version: choose the default available
	- Environment variables:
		- `NODE_ENV=production`
		- `PORT=3001`
		- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
		- `JWT_SECRET`
		- `FRONTEND_URL=https://your-frontend-domain`
	- Click Run NPM Install, then Restart Application

Frontend (Nuxt SSR)
- cPanel → Setup Node.js App → Create
	- App root: `apps/seatre/frontend`
	- Startup file: `server.cjs`
	- Environment variables:
		- `NODE_ENV=production`
		- `NUXT_PUBLIC_API_BASE=https://api.your-domain` (or your backend URL)
	- Click Run NPM Install
	- Click Run JS Script → choose `build`
	- Restart Application

Domains and routing
- Point the main domain to the frontend app.
- Use a subdomain (e.g., `api.your-domain`) for the backend.

Updating deployments
- In Git Version Control, Pull latest changes.
- For frontend: run `build` again, then Restart Application. For backend: Restart Application.

Notes
- Backend CORS uses `FRONTEND_URL` and sets credentials. Ensure the frontend domain matches exactly (protocol + host).
- In local dev, `/api` is proxied by Vite. In production, `NUXT_PUBLIC_API_BASE` controls the API base.
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
