# FROM node:20

# WORKDIR /app
# COPY package*.json ./
# RUN npm install -g nodemon
# COPY . .
# EXPOSE 5000

# CMD ["nodemon", "app.js"]


# Stage 1: Build Frontend
FROM node:20 as frontend-builder
# Set working directory for the frontend build
WORKDIR /MyWork/frontend
# Copy package files into the current working directory
COPY frontend/package.json frontend/yarn.lock ./
# Install dependencies (including vite)
RUN yarn install
# Copy the rest of the frontend source code
COPY frontend/ .
# Run the build command (make sure your vite config outputs to "build")
RUN yarn build

# Stage 2: Build Backend
FROM node:20
# Set working directory for the backend
WORKDIR /MyWork/backend
# Copy the backend package files
COPY backend/package*.json ./
# (Optional) Install nodemon globally if you need it for development;
# for production, you might want to run simply "node app.js"
RUN npm install -g nodemon
# Install backend dependencies
RUN npm install
# Copy the rest of the backend source code
COPY backend/ .
# Copy the built frontend static files from the first stage
# If your vite build outputs to "build" (because you configured it), use that folder.
# If it outputs to "dist" (the default), change "build" to "dist" accordingly.
COPY --from=frontend-builder /MyWork/frontend/build ./build
# Expose the port
EXPOSE 5000
# Start the server
CMD ["nodemon", "app.js"]
