FROM node:slim

EXPOSE 3000

COPY ./package.json package.json

RUN npm install

COPY ./src src
COPY ./config.yml config.yml
COPY ./config.local.yml config.local.yml

CMD ["node", "src/bin/www"]
