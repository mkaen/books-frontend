FROM node:lts-alpine

WORKDIR /books-fe

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]

# Konteiner loo ja käivita näiteks: docker run -d -p 8080:8080 -v $(pwd):/books-fe --name books-fe books-fe:v1.0