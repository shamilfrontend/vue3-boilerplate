FROM node:16.14.0-alpine
ENV TZ=Europe/Moscow
WORKDIR /root/app
COPY . .
RUN yarn install && yarn lint:js && yarn lint:style && yarn test:c
