# Stage 1: Build using Alpine
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Minimal runtime using Alpine
FROM node:20-alpine

WORKDIR /app

# ✅ Install curl in final stage for healthcheck to work
RUN apk add --no-cache curl

# Copy from build stage
COPY --from=builder /app .

EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
