FROM node:18 as development
WORKDIR /app
COPY package.json .
RUN  npm i
COPY . . 
EXPOSE 5005
CMD [ "npm","run","start:dev" ]