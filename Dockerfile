FROM node:16.13 as build 
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . . 
RUN npm run build --legacy-peer-deps
EXPOSE 3000
CMD npm run start:prod
