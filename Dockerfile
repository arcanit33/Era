FROM node:18-alpine

WORKDIR /app
ENTRYPOINT /app/entrypoint.sh

COPY . .

RUN npm ci
