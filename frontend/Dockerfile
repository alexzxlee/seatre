# Dockerfile (for production)

# ---- Builder ----
FROM node:24 AS builder
WORKDIR /app
COPY package*.json ./
# Install dependencies
RUN npm ci
COPY . .
# Build for production
RUN npm run build

# ---- Production image ----
FROM node:24
WORKDIR /app
# Use .env.production for production builds
ENV NODE_ENV=production

# Only copy build output, smaller final image, more secure, is necessary
COPY --from=builder /app/.output ./.output
# Expose the port your app runs on
EXPOSE 3000
# Start the app in production mode
CMD ["npm", "run", "start"]
