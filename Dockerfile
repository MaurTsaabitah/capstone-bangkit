# Use the official Node.js 18 image as a base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json file to the working directory first
COPY package.json .

# Install dependencies early to leverage caching
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (or your desired port)
EXPOSE 3001

# Start the application
CMD ["npm", "start"]