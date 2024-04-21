FROM node:20

ARG APP_DIR=ts-node-project
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5555 5432

RUN npm run build

CMD npm run start:prod