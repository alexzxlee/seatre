# Use the official Node.js image as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3001 to the outside world
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "dev"]