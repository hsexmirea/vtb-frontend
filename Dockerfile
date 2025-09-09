FROM node:18-alpine

WORKDIR /app

COPY app/package*.json ./

RUN npm install

COPY app/. .

EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev"]

