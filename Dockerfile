
# Stage 1: Build using Alpine
#FROM node:18-alpine as builder

FROM node:current-alpine3.22 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci 

COPY . .

# Stage 2: Minimal runtime using Alpine
FROM node:current-alpine3.22

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["node", "server.js"]


