# Use a node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . ./app

# Expose the port your client runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "dev"]
