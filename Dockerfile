FROM node:16.17.1-alpine3.16
RUN mkdir /home/app
WORKDIR /home/app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node", "app.js" ]