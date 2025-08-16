FROM node:24-alpine
WORKDIR /server

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
ENV NODE_ENV=production
EXPOSE 3001
CMD ["npm", "start"]