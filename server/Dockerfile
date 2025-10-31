FROM node:24
WORKDIR /server

# copy package.json and package-lock.json before running npm ci
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
ENV NODE_ENV=production
EXPOSE 3001
CMD ["npm", "start"]