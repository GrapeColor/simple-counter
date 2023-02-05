FROM node:16

WORKDIR /app/simple-counter

COPY package*.json ./
RUN [ "npm", "ci", "--production" ]

COPY ./dist ./dist

CMD [ "npm", "start" ]
