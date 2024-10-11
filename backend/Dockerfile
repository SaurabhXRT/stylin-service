# Use a node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json ./

# Install pnpm and install dependencies 
RUN npm install -g pnpm && pnpm install  --frozen-lockfile

# Copy the rest of the application code
COPY . ./app

# Expose the port your backend runs on
EXPOSE 5000

# Command to run your app
CMD ["pnpm", "run", "dev"]
