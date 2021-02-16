FROM node:13.2.0

WORKDIR /app
COPY app/package.json .
COPY app/package-lock.json .

run npm install
COPY app/ .

run npm run test
EXPOSE 3000
entrypoint ["npm","start"] 

