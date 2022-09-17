FROM node:10.16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./


RUN npm install --silent

COPY . .

EXPOSE 4000

CMD ["npm","server"]