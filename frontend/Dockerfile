
# For local development
FROM node:18-alpine AS dev

WORKDIR  /app

COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 3000

CMD ["npm", "start "]


# Production build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

# Serve the build with a lightweight web server
FROM nginx:alpine AS production

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]