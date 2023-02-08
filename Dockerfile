FROM node:16

WORKDIR /app/simple-counter

ENV NODE_ENV=production

COPY package*.json ./
RUN [ "npm", "ci" ]

COPY ./dist ./dist

CMD [ "npm", "start" ]
