FROM node:8-alpine
WORKDIR /app

RUN apk add bash

ENV HOST 0.0.0.0
EXPOSE 3000
