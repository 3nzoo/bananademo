FROM node:14

# Working directory be app
WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./


RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","run","start"]