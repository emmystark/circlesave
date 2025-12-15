# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for building native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install pnpm if pnpm-lock.yaml exists, otherwise use npm
RUN if [ -f pnpm-lock.yaml ]; then \
      npm install -g pnpm && \
      pnpm install; \
    else \
      npm ci; \
    fi

# Copy Prisma schema and config
COPY prisma ./prisma/
COPY prisma.config.js* ./

# Generate Prisma Client (doesn't require DATABASE_URL during build)
# prisma.config.js handles missing DATABASE_URL gracefully
RUN npx prisma generate

# Copy all source files
COPY . .

# Build the frontend (if needed)
RUN npm run build || true

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["npm", "run", "start"]

