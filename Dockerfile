FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install bcrypt@latest --save

COPY . .

CMD ["npm", "run", "start"]