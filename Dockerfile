# Production-oriented image

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src ./src

ENV NODE_ENV=productuion
ENV PORT=3000

EXPOSE 3000

USER node

CMD [ "node","src/server.js" ]