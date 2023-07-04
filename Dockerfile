# Stage 1: Build Stage
FROM node:18.14.2-alpine as build

# Set maximum budget (1GB) for the webpack build
ARG NG_BUILD_BUDGET=2048
ENV NG_BUILD_BUDGET=${NG_BUILD_BUDGET}

# Set the working directory
WORKDIR /usr/src/app

# Copy only package files to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Production Stage
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy the compiled application from the build stage
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

# Expose port 80 for remote access
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
