# Use the official Node.js image as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install ts-node for handling TypeScript
RUN npm install ts-node --save-dev

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
# Updated to match docker-compose.yml, which command: npm run dev is for development mode, whereas npm start is for in production. 