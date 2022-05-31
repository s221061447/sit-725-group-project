FROM node:16-alpine

WORKDIR /app

COPY . .

EXPOSE 8000

RUN npm install

RUN cp .env.example .env

CMD ["npm", "run", "start"]
