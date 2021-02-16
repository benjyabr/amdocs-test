FROM node:13.2.0

WORKDIR /app
COPY app/package.json .
COPY app/package-lock.json .

run npm install
COPY app/ .
EXPOSE 3000

run npm run test
entrypoint ["npm","start"] 
