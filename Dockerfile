FROM node:20-alpine

WORKDIR /app

# Install deps before copying full source for better layer caching
COPY package.json ./
RUN npm install

# Copy the rest of the project
COPY . ./

# Run the test suite by default
CMD ["npm", "test"]
