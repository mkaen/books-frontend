FROM node:lts-alpine

WORKDIR /books-fe

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]