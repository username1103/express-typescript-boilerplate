FROM node:alpine

RUN mkdir -p /usr/src/myApp && chown -R node:node /usr/src/myApp

WORKDIR /usr/src/myApp

COPY package.json package-lock.json ./

USER node

RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

