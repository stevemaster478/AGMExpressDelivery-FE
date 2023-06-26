# Use Alpine as the base image
FROM node:18.14.2-alpine as build

# Set maximum budget (1GB) for the webpack build
ARG NG_BUILD_BUDGET=2048
ENV NG_BUILD_BUDGET=${NG_BUILD_BUDGET}

# Set the working directory
WORKDIR /usr/src/app

# Copy package files to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Copy the rest of the source code
COPY . .

# Build the application
RUN pnpm start

# Use a lighter Alpine image as the base
FROM nginx:alpine

# Copy the compiled application
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

# Expose port 4200 for remote access
EXPOSE 4200
