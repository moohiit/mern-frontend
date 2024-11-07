FROM node:alpine3.20 as build

#Build app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "deamon off:" ]