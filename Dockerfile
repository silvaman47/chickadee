# Use Node.js 22 as base image
FROM node:22.19.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies for both frontend and backend
COPY package.json ./
COPY backend/package.json backend/
RUN npm install
RUN cd backend && npm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Expose port (e.g., 3000 for backend)
EXPOSE 3000

# Start the backend server
CMD ["node", "backend/server.js"]