FROM node:14.15-alpine3.11

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

EXPOSE ${PORT}

CMD ["node", "./src/app.js"]


