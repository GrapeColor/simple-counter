FROM node:18

WORKDIR /app/simple-counter

ENV NODE_ENV=production

COPY package*.json ./
RUN [ "npm", "ci" ]

COPY ./dist ./dist

CMD [ "npm", "start" ]
