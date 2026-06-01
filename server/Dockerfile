# ==========================================
# STAGE 1: The Build Stage (The Prep Station)
# ==========================================
FROM node:24.15.0-alpine AS builder

WORKDIR /usr/src/app

# Install ALL dependencies (including TypeScript compiler)
COPY package*.json ./
RUN npm install

# Copy source code and compile it
COPY . .
RUN npm run build

# ==========================================
# STAGE 2: The Production Stage (The Plating Station)
# ==========================================
FROM node:24.15.0-alpine AS production

WORKDIR /usr/src/app

# Only copy package files
COPY package*.json ./

# Install ONLY production dependencies (ignores devDependencies like tsc, linters, etc.)
RUN npm ci --only=production

# Core Security: Grab ONLY the compiled JS files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 5000

# Run native JavaScript from the dist folder
CMD ["node", "dist/index.js"]