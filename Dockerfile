# --- First Stage: Build Stage ---
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install

# Copy the rest of the source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# --- Second Stage: Final Image ---
# This stage uses a fresh base image to reduce the final image size and remove unnecessary dependencies.
# By copying only the compiled files and production dependencies from the builder stage,
# we ensure a smaller and more secure image for production.
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Environment variables
ENV NODE_ENV=production

# Expose the port on which the application runs
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]