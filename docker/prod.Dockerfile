FROM node:16.14.0-alpine as build-stage
ENV TZ=Europe/Moscow
WORKDIR /root/app
COPY . .
RUN yarn install && yarn build:prod

FROM nginx:alpine
EXPOSE 80

COPY --from=build-stage /root/app/dist /usr/share/nginx/html
ADD nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
