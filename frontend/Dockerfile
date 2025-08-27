# ---- Builder ----
FROM node:24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production image ----
FROM node:24
WORKDIR /app
ENV NODE_ENV=production

# Only copy build output, smaller final image
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
