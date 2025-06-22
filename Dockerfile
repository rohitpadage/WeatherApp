
# Stage 1: Build using Alpine
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci 

COPY . .

# Stage 2: Minimal runtime using Alpine
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["node", "server.js"]


