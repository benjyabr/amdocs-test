FROM node:13.2.0 as base
WORKDIR /app
COPY app/package.json app/package-lock.json app/server.js ./
COPY app/views ./views
RUN npm install --production
EXPOSE 3000

FROM base as test
WORKDIR /app
RUN npm install
COPY app/test ./test
RUN npm run test

FROM base as prodline
WORKDIR /app 
COPY app/public ./public
ENTRYPOINT npm start
