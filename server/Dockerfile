# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (rebuilds native modules like bcrypt for Linux)
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Create temp directory for file uploads
RUN mkdir -p public/temp

# Expose port
EXPOSE 8000

# Set environment to production
ENV NODE_ENV=production

# Start application
CMD ["npm", "start"]

